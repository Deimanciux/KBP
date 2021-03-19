<?php

namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\VarDumper\VarDumper;

class ObjectOrientedMetricsCommand extends Command
{
    protected static $defaultName = 'app:object-metrics';
    private $projectDir;

    public function __construct($projectDir)
    {
        $this->projectDir = $projectDir;

        parent::__construct();
    }

    protected function configure()
    {
        $this->setDescription('Calculates Object Oriented metrics')
        ->addArgument('metric', InputArgument::OPTIONAL, 'Metric short name', 'noam');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $json = json_encode($this->getArrayFromXmlFile());
        $array = json_decode($json,true);
        $metric = $input->getArgument('metric');
        try {
            $this->dumpSummary($array, $metric);
        } catch (\Exception $exception) {
            VarDumper::dump("Metric with given short name ' $metric ' not found, try to use app:help to see all metrics" );
        }

        return 0;
    }

    private function getArrayFromXmlFile() {
        return simplexml_load_string(file_get_contents(
            $this->projectDir . '/phpDepend/summary.xml',
            FILE_USE_INCLUDE_PATH),
            "SimpleXMLElement",  LIBXML_NOCDATA
        );
    }

    private function dumpSummary(array $array, string $attribute): void
    {
        foreach($array['package'] as $package) {
            if (!isset($package['class']['@attributes'])) {
                foreach ($package['class'] as $class) {
                    VarDumper::dump($class['@attributes']['name'] . ' ' . $class['@attributes'][$attribute]);
                }
            } else {
                VarDumper::dump($package['class']['@attributes']['name'] . ' ' . $package['class']['@attributes'][$attribute]);
            }
        }
    }
}

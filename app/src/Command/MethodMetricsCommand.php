<?php

namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\VarDumper\VarDumper;

class MethodMetricsCommand extends Command
{
    protected static $defaultName = 'app:method-metrics';
    private $projectDir;

    public function __construct($projectDir)
    {
        $this->projectDir = $projectDir;

        parent::__construct();
    }

    protected function configure()
    {
       $this->setDescription('Shows method related metrics ')
       ->addArgument('metric', InputArgument::OPTIONAL, 'Metric name', 'ccn');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $json = json_encode($this->getArrayFromXmlFile());
        $array = json_decode($json,true);
        $metric = $input->getArgument('metric');
        try {
            $this->dumpSummary($array, $metric);
        }
        catch (\Exception $exception) {
            VarDumper::dump("Metric with given name ' $metric ' not found, try to use app:help to see all metrics");
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
        $sum = 0;

        foreach($array['package'] as $package) {
            if (!isset($package['class']['method'])) {
                foreach ($package['class'] as $class) {
                    VarDumper::dump('------' . $class['@attributes']['name'] . '-----');

                    if (!isset($class['method']['@attributes'])) {
                        foreach ($class['method'] as $method) {
                            VarDumper::dump($method['@attributes']['name'] . ' ' .(double)$method['@attributes'][$attribute]);
                            $sum += (double)$method['@attributes'][$attribute];
                        }
                        echo("\n");

                        continue;
                    }

                    VarDumper::dump($class['method']['@attributes']['name'] . ' ' .(double)$class['method']['@attributes'][$attribute]);
                    $sum += (double)$class['method']['@attributes'][$attribute];
                    echo("\n");
                }

                continue;
            }

            if (!isset($class['method']['@attributes'])) {
                VarDumper::dump('------' . $package['class']['@attributes']['name'] . '-----');

                foreach ($package['class']['method'] as $method) {
                    VarDumper::dump($method['@attributes']['name'] . ' ' . (double)$method['@attributes'][$attribute]);
                    $sum += (double)$method['@attributes'][$attribute];
                }

                echo("\n");

                continue;
            }

            VarDumper::dump($package['class']['method']['@attributes']['name'] . ' ' .(double)$package['class']['method']['@attributes'][$attribute]);
            $sum += (double)$package['class']['method']['@attributes'][$attribute];
        }

        VarDumper::dump('Total ' . $sum);
    }
}

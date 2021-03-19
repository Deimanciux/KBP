<?php

namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class HelpCommand extends Command
{
    protected static $defaultName = 'app:help';
    private $projectDir;

    public function __construct($projectDir)
    {
        $this->projectDir = $projectDir;

        parent::__construct();
    }

    protected function configure()
    {
        $this->setDescription('Shows all commands for metrics');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $this->showMethodRelatedMetrics();
        $this->showObjectRelatedMetrics();

        return 0;
    }

    private function showMethodRelatedMetrics() {
        echo("\n");
        echo("----------Method related metrics-----------------\n");
        echo("For method metrics write app:method-metrics [attribute from below]\n");
        echo("ccn    - Cyclomatic Complexity Number\n");
        echo("ccn2   - Extended Cyclomatic Complexity Number\n");
        echo("cloc   - Comment Lines of Code\n");
        echo("eloc   - Executable Lines of Code\n");
        echo("fanout - Number of Fanouts Referenced Classes\n");
        echo("hb     - Halstead Bugs \n");
        echo("hd     - Halstead Difficulty\n");
        echo("he     - Halstead Effort \n");
        echo("hi     - Halstead Intelligence\n");
        echo("hl     - Halstead Level \n");
        echo("hnd    - Halstead Vocabulary\n");
        echo("ht     - Halstead Programming Time \n");
        echo("hv     - Halstead Volume\n");
        echo("lloc   - Logical Lines Of Code\n");
        echo("loc    - Lines Of Code\n");
        echo("mi     - Maintainability Index\n");
        echo("ncloc  - Non Comment Lines Of Code\n");
        echo("npath  - NPath Complexity\n");
    }

    private function showObjectRelatedMetrics() {
        echo("\n");
        echo("----------Object oriented metrics-----------------\n");
        echo("For object oriented metrics write app:object-metrics [attribute from below]\n");
        echo("ca      - Afferent Coupling\n");
        echo("cbo     - Coupling Between Objects \n");
        echo("ce      - Efferent Coupling\n");
        echo("cis     - Class Interface Size\n");
        echo("cloc    - Comment Lines of Code\n");
        echo("cr      - Code Rank Google \n");
        echo("csz     - Class Size \n");
        echo("dit     - Depth of Inheritance Tree\n");
        echo("eloc    - Executable Lines of Code\n");
        echo("lloc    - Logical Lines Of Code \n");
        echo("loc     - Lines Of Code\n");
        echo("noam    - Number Of Added Methods\n");
        echo("nocc    - Number Of Child Classes\n");
        echo("noom    - Number Of Overwritten Methods\n");
        echo("ncloc   - Non Comment Lines Of Code\n");
        echo("nom     - Number Of Methods\n");
        echo("npm     - Number of Public Methods\n");
        echo("rcr     - Reverse Code Rank\n");
        echo("vars    - Properties\n");
        echo("varsi   - Inherited Properties\n");
        echo("varsnp  - Non Private Properties\n");
        echo("wmc     - Weighted Method Count\n");
        echo("wmci    - Inherited Weighted Method Count\n");
        echo("wmcnp   - Non Private Weighted Method Count \n");
        echo("\n");
        echo("For more information read: https://pdepend.org/documentation/software-metrics/index.html\n");
    }
}

<?php

// app/Console/Commands/DropFilmIndex.php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Elasticsearch\ClientBuilder;

class DropFilmIndex extends Command
{
    protected $signature = 'elasticsearch:drop-film-index';
    protected $description = 'Drop Elasticsearch index for the Film model';

    public function handle()
    {
        $indexName = 'films'; // Set your desired index name

        $client = ClientBuilder::create()->build();

        // Check if the index exists before attempting to delete it
        if ($client->indices()->exists(['index' => $indexName])) {
            $client->indices()->delete(['index' => $indexName]);
            $this->info('Index dropped successfully: ' . $indexName);
        } else {
            $this->warn('Index does not exist: ' . $indexName);
        }
    }
}

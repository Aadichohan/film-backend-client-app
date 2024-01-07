<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Elasticsearch\ClientBuilder;

class IndexFilm extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'elasticsearch:create-film-index';
    protected $description = 'Create Elasticsearch index';

    /**
     * The console command description.
     *
     * @var string
     */
    // protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        // return 0;

        $indexName = 'films'; // Change this to your desired index name

        $client = ClientBuilder::create()->build();

        $params = [
            'index' => $indexName,
            'body' => [
                'settings' => [
                    'number_of_shards' => 1,
                    'number_of_replicas' => 0,
                    // Add other index settings as needed
                ],
                'mappings' => [
                    'properties' => [
                        'name' => ['type' => 'text'],
                        'description' => ['type' => 'text'],
                        'release_date' => ['type' => 'date'],
                        'ticket_price' => ['type' => 'float'],
                        'country' => ['type' => 'keyword'],
                        'genre' => ['type' => 'keyword'],
                    ],
                ],
            ],
        ];

        $response = $client->indices()->create($params);

        $this->info('Index created successfully: ' . $indexName);
    }
}

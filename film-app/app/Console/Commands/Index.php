<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Film;
use Elasticsearch;

class IndexFilms extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    // protected $signature = 'command:name';
    protected $signature = 'index:films';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

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

        $posts = Film::all();

foreach ($posts as $post) {
    try {
        Elasticsearch::index([
            'id' => $post->id,
            'index' => 'films',
            'body' => [
                'name' => $post->name,
                'description' => $post->description
            ]
        ]);
    } catch (Exception $e) {
        $this->info($e->getMessage());
    }
}

$this->info("Posts were successfully indexed");
    }
}

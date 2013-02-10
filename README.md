# editor5

Editor5 is a text/html editor using content editable and localStorage. Documents are persisted to redis.

### Installation

Install redis: 

    sudo apt-get install redis-server

by default editor5 will try to connect to localhost.

Install PHP dependencies with composer:

    composer install


### Usage

From the host you setup on, the root page is the 'draft' page. If you save from that page, your document will have a random ID assigned to it and you'll be redirected to /{id}.

You can also go directly to the page you want to edit: eg. http://host/page-of-awesome and begin editing. When you save, the contents of the page are saved with the key provided in the URL.



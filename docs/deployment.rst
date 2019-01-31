Deployment
==========

My aim to have a **Couchbase/Express/Client** stack running on AWS_.

`Nautilus Server`_ is a Node_ Express_ application that provides the logic
layer between `Nautilus Client`_ and the Couchbase_ NoSQL database.

Found recipe for installing Couchbase_ Community Edition but some configuration
needs attention. Here I shall try to document my solutions.

In particular I need to sort out the available routes that I can use to query
Couchbase from `Nautilus Server`_.

These are::

   CouchbaseServerLocation
   SSHLocation
   TCPLocation

Which are ranges of IP adresses.

But OK here the first link that may be helpful:

  https://blog.couchbase.com/build-photogallery-app-aws-rekognition-couchbase/

.. _AWS: http://aws.amazon.com/
.. _Couchbase: http://www.couchbase.com/
.. _Node: http://www.nodejs.org/
.. _Express: http://www.expressjs.com/
.. _`Nautilus Client`: https://github.com/darrylcousins/nautilus-client
.. _`Nautilus Server`: https://github.com/darrylcousins/nautilus-server

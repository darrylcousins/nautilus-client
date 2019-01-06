Install
=======

The steps to get started.

Create a react starter app::

  $ cd .virtualenvs
  $ npx create-react-app nautilus

Maybe it should all work by cloning this repository and then continue.

Python virtual environment::

  $ cd nautilus
  $ virtualenv -p python3 .
  $ source bin/activate

Install `nodeenv` into same directory and activate::

  $ pip install nodeenv
  $ nodeenv -p
  $ source bin/activate

In order to satisfy Typescript I added a `dummy.ts` file and only then could run::

   (nautilus) $ npm start

Additional Components
---------------------

With local `npm` install `react-router`::

  (nautilus) $ npm install --save react-router react-router-dom

Install `react`/`apollo`/`graphql` stack::

  (nautilus) $ npm install --save apollo-boost apollo-link-context react-apollo graphql-tag graphql

`react-form`::

  (nautilus) $ npm install --save react-form

`font-awesome`::

  (nautilus) $ npm install --save @fortawesome/fontawesome
  (nautilus) $ npm install --save @fortawesome/fontawesome-svg-core
  (nautilus) $ npm install --save @fortawesome/react-fontawesome
  (nautilus) $ npm install --save @fortawesome/fontawesome-free-solid
  (nautilus) $ npm install --save @fortawesome/fontawesome-free-regular
  (nautilus) $ npm install --save @fortawesome/fontawesome-free-brands

Using `PapaParse <https://www.papaparse.com/>`_ to handle csv files::

  (nautilus) $ npm install --save papaparse

Using `react-table <https://react-table.js.org>`_ to display data.::

  (nautilus) $ npm install --save react-table

Transitions::

  (nautilus) $ npm install --save react-transition-group

CSV helper::

  (nautilus) $ npm install --save react-csv

Modals::

  (nautilus) $ npm install --save react-modal

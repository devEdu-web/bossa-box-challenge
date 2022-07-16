# Bossabox Backend Challenge

## Business logic
- [x] Create endpoint to get all registered tools.
- [x] Create endpoint to return tools with an specific tag, using query params
- [x] Create endpoint to register a new tool.
- [x] Create endpoint to delete a tool by its id.

## Authentication
- [x] Create endpoint to issue access tokens.
- [x] Create endpoint to log users and return tokens.
- [x] Create middleware to validate requests. 

Here the applications will follow the following flow:

![Authentication flow](https://media.discordapp.net/attachments/611633543420051458/995500936514510908/unknown.png?width=1375&height=664)

## Database

In the database design I decided to use a many-to-many relationship, in which there is a table `Tool`, a table `Tag`, a table `TagsOnTools` and a `User`. When the user adds a new tool, we will save the tools and tags and its respective tables and create a relation. But, before saving a tag into the database the application will check if the tag already exists. If so, it won't change the database, but otherwise, it will save the tag.

**Note: Users have no relations with tools. Their role here is for authentication and authorization only.**

## Configuration

First of all let's fill out our environment variables as stated in the file `.env.example`, without the variables in this file the project won't run as expected. **Note: The .env file has a link to a database, make sure that database exists. We are using MySQL here, so some queries and operators may not be available in other SQL databases.**

After doing this, we need to go to our config folder `src/config` and create a new file called `default.ts` following the `default.example.ts` file. And that's it, we have all configuration set and ready.

## Usage

* Make sure you have Typescript and Node.js installed in your machine.
* Run `npm install` to install all the dependencies.
* Run `npx migrate dev --name migration_name` to migrate the schema into your database.
* Run `npm run dev` to initialize the project.

***


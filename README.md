# Bossabox Backend Challenge

## Business logic
- [ ] Create endpoint to get all registered tools.
- [ ] Create endpoint to return tools with an specific tag, using query params
- [ ] Create endpoint to register a new tool.
  - [ ] Check if tags exists in database.
  - [ ] Save tags if it doesn't exist.
  - [ ] Get the id of tags saved.
  - [ ] Get the id of the tool save.
  - [ ] Create relation between the tool and tags.
- [ ] Create endpoint to delete a tool by its id.

## Authentication
- [ ] Create endpoint to register users.
- [ ] Create endpoint to log users and return tokens.
- [ ] Create middleware to validate requests. 

Here the applications will follow the following flow:

![Authentication flow](https://media.discordapp.net/attachments/611633543420051458/995500936514510908/unknown.png?width=1375&height=664)

## Database

In the database design I decided to use a many-to-many relationship, in which there is a table `Tool`, a table `Tag` and a table `TagsOnTools`. When the user adds a new tool, we will save the tools and tags and its respective tables and create a relation. But, before saving a tag into the database the application will check if the tag already exists. If so, it won't change the database, but otherwise, it will save the tag.
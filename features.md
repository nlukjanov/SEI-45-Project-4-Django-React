- User register
- user login
- user profile page with: whatever data
- homepage
- index view of something
- detail view of something
- crud operations
- one to many relationship - example: comments
- many to many relationship - example: category


User stories:
1. I login/register
2. i can see my account
3. my account show what?:
  -food log history
    - table
    - chart (base line for healthy intake)



Food log
1. enter food (dropdown with real time search) ONLY SINGLE ENTRY
2. portion (grams)
3. date (date)

then we can combine by day and display daily total (weekly, monthly)


We have a fixed (mvp) standard intake
Add weight model and ability
add floating plus button to add new log entry

portion unit conditional on the type of food

add history button to navbar and history page with just all logs listed in descending order
for that we will need get all logs view and the get single(for edit)


add view to food model in order to get names and id for front end selector
when component mounts (create or edit log) run api request to get table of all foods
user selects name and selection gives us id.

## swyft-discord-boilerplate

### Work in progress!

``npx swyft-discord-bot create name-of-the-bot --language typescript --token sometoken --prefix ! --dir output-here``

+ The only command so far is ``create`` which takes the name of the bot as the first argument.
+ Next argument is ``--language`` or ``--l`` which allows you to specify a programming language, currently only ``javascript`` and ``typescript``!
+ Next argument is ``--token`` or ``--t`` which allows you to specify your bot token that you got from discord developer portal.
+ Next argument is ``--prefix`` or ``--p`` which allows you to specify which prefix you want your bot commands to have.
+ Lastly, we have ``--dir`` or ``--d`` or ``--o`` which allows you to specify the directory where you want your bot boilerplate to be created.

The command and name must be in order so:
``npx swyft-discord-bot create name-of-the-bot``
with the ``name-of-the-bot`` part possibly being anything you want, as long as there is no spaces in the name.

All the other arguments can be in any order.

Adding quotes ``"`` may actually append the quotes to your file or folder name instead of enabling you to use argument name with spaces.
In rare occassions, you may want to use ``\`` backslash character instead to escape the double quotes.

Running the exact same command twice will not overwrite or update your file content but instead append to it.
If your file had a line:

``text``

and you ran the same command again, the line in that file will become:

``texttext``

So this command line tool is for one usage only on a single directory.

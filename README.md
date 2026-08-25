# Middle-earth Misfits

This is a small Tolkien character matcher I originally made awhile back and recently found sitting on my computer again.

I had the project open for something else, started poking around in it, and figured I might as well clean it up a little and put it on GitHub instead of letting it disappear into an old folder somewhere.

The idea is pretty simple: pick a race, a place you'd rather live, and a preferred form, and it'll pull a random lesser-known character from Tolkien's legendarium that matches.

It's less "Which member of the Fellowship are you?" and more "Congratulations, apparently you're some guy who guarded a gate in Gondolin."

## What's in here

The whole thing is intentionally tiny:

* `index.html` — the page
* `style.css` — the Middle-earth-ish styling
* `app.js` — filtering and matching
* `characters.json` — the local character dataset

There's no backend, database, build process, npm setup, or anything like that. It's just HTML, CSS, JavaScript, and a JSON file.

The project originally used The One API, which meant anyone using it had to provide an API key. I removed that and moved the character data into a local dataset instead. That made a lot more sense for something this simple and means the site can just work as a static page.

I've also been gradually cleaning up the character data and adding more obscure characters from across the First, Second, and Third Ages. The dataset is currently around 150 characters and will probably continue getting tinkered with whenever I feel like falling down another Tolkien lore rabbit hole.

## Why "Misfits"?

Mostly because Middle-earth has hundreds of named characters and the same dozen people get all the attention.

This is for the Beregonds, Andreths, Azaghâls, Penlods, Ioreths, Gwindors, weird Maiar, minor kings, forgotten Hobbits, and assorted people who get three paragraphs in an appendix and somehow still have an entire Tolkien Gateway page.

## Status

This isn't really meant to be a serious product or some giant ongoing project.

It's an older little web experiment that I wanted to preserve, clean up, and have some fun with again.

I may eventually turn the basic filters into more of an actual personality matcher, add better character results, or just keep stuffing increasingly obscure people into `characters.json`.

We'll see.

## Tolkien stuff

This is an unofficial fan project.

Middle-earth, its characters, and the rest of Tolkien's legendarium belong to their respective rights holders. Character information here is limited to basic factual metadata, with links to Tolkien Gateway if you want to go down the lore rabbit hole yourself.

No Rings of Power were forged in the making of this website.

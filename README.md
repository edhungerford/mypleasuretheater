# mypleasuretheater

A React app and Discord bot designed to show movies to my friends in a unique and silly way. Really not designed for use outside of my own unique setup, but I wanted this in GitHub, and thought if anyone *does* want to drive themselves crazy trying to figure this out, well, they ought to have that chance.

## Setup

If you want to use this yourself, you'll need:
- a Discord bot with these abilities:
    - view channels
    - send messages and create posts
    - read message history
    - connect to voice channels
    - speak in voice channels (might not be necessary)
    - use voice activity (also not sure)
    - set voice channel status (probably unnecessary)
-your own `config.json` and `.env` file for each half of this project (so one `config.json` file in `mypleasuretheater/mypleasureguy/` and one in `mypleasuretheater/mypleasuretheater`). 

The `config.json` should look like this:

```json
{
	"token":    #Your bot's token.
    "clientId": # Your bot's client ID.
	"guildId":  # Your server ID.
}
```

And your `.env` should simply look like this:
```
PORT=3002
```

Now you can use `npm start` in `mypleasureguy/mypleasuretheater` to boot the React app.

Then, you'll need a way to stream the contents of the React app and overlay the video you want to stream. I recommend using OBS Studio and using chromakey to put the video inside the movie screen. Then you can stream it using OBS' virtual camera. 

After that, use `node index.js` in `mypleasureguy/mypleasureguy` to start the Discord bot, and use the `/join` command to get the bot to join whatever voice channel you're in. (You must join a voice channel in the same server as the bot for this part to work properly.)

## FAQ

### It didn't work!

Yeah, I bet. 

### The animations are clunky and slow!

Indeed they are. Part of it is probably the overhead demanded by streaming a React app and a video at the same time, and part of it is the terribly messy way I'm pinging `localhost:3001`.

### Nobody had a good time watching the movie!

Really? What movie did you watch? I've played *Megalopolis* (2023) with this and everyone loved it. Try that.

## to do
- try catch : error prisma demander a gpt
- dto / prisma
- check ban
- check blocked
- check friend
- promises
- join channel
- delete channel (only owner)
- quit channel (if owner: he has to set new owner)
- channel update : settings, pwd (mod / delete)
- mp
- check longueur des strings pour /dev/random


## TOFIX
- 




# Chat features

b: implemented in back-end
f: Implemented in front
x: Implemented in both
~1-9: priorities of implementation

## Access Channel
- [b] Create channel (hash pwd w argon2)
- [b] Get public channels ("discover")
- [ ] Get joined channels
>		list by last activity
- [b] Get a channel by name
- [b] Get a channel by id
- [ ] Separate private conversation (privmsg) from channels (chnls)
## Access Users
- [ ] Get users of a channel
>	  If is in chan + not banned
- [ ] Get a user of a channel by its name
## Access messages
- [ ] Get messages of a channel 
>		Listed by date of creation

## Mod channel
- [ ] Join Channel (add user)
- [ ] Quit Channel (remove user)
- [ ] Post message on a channel (add message)
- [ ] change name 
- [ ] change pwd (hash w argon2)
- [ ] remove pwd

_____________________________________































# Socket
- [ ] Through socket: get users connected
- [ ] Challenge user to pong game (see with game implementation)
>	User should be connected

----

# User interface (front end)

- [ ] Friends list / user list
---
- [ ] Last channel/conversation list by activities
> - [ ] Open channel

---

- [ ] New Channel button (btn/icon/avatar)
> - [ ] Public channel list  (main)
> > - [ ] Join channel
> - [ ] Create channel
---
- [ ] All Channels button "myChannels"
> - [ ] All Channels List 
> - [ ] See Channels chat (main)
> - [ ] Send message to channels
---
- [ ] All Conversation button
> - [ ] All my Conversation List


# To Design
- [ ] Private channel
- [ ] Private conversation
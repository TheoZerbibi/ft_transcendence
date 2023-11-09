### TRANSCENDENCE

b: implemented in back-end
f: Implemented in front
x: Implemented in both
~1-9: priorities of implementation

# Chat features

## Access Channel
- [b] Add channel
- [b] Get public channels ("discover")
- [ ] Get joined channels
- [b] Get a channel by name
- [b] Get a channel by id

## Access Users
- [ ] Get users of a channel
>	  If is in chan + not banned

## Access messages
- [ ] Get priv conversation on which i am

- [ ] Get channels on which i am "myChannels"  ~1
> - [ ] Get Allowed channels (public channel + private channel on which i am) ~4

- [b] Join Channel
- [ ] Quit Channel

- [ ] Separate private conversation (privmsg) from channels (chnls)
> - [ ] Sort my channel list by last activity ~1

- [ ] Start Conversation ~1
> - [ ] Get userlist or ping user from a prompt
> - [ ] Create conversation


- [ ] Display last/all conversation ~3
> - [ ] Get Conversations sorted by last activities
> - [ ] Get conversation message sorted by last activites


# Operation on Channel (require channel to perform) (Channel component for the front)

- [ ] post message on a channel ~1

- [ ] fetch all message of channel ~1

- [b] Mod Channel (require to be channel Admin or above, don't work on privmsg) ~1
> - [ ] Change password (owner only) : hash them with argon2
> - [ ] Delete Channel (owner only)

- [b] get userList of channel

-------------------------------------

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

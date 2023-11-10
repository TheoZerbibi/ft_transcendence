

# Channel

controller recoit : Dto qu'on a predefinis par rapport a la requete qu'on va traiter
update la DB .
retourne 

## Create channel
1. **Front**: bouton -> input
	- *demande*: name + is_public + mdp
	- *envoie*: user: ChannelUserCto + channel: CreateChannelDto
2. **Back**:
    - *DB: cree*: channel avec donnees recues
    - *DB: cree*: channelUser (owner & admin)
	- *DB: ajoute*: channelUser au channel
	- *returns*: channel / channelDto , a voir ce que le front fait une fois channel cree *?*

## Join channel
1. **Front**: bouton -> input
	- *check*: permissions : pas possible d'add si banned (-> requete au **back** ?)
	- *demande*: target (dans liste d'amis -> requete au **back** ?)
	- *envoie*: target: ChannelUserCto *ou UserCto*? + channel: ChannelCto
2. **Back**:
	- *check*: permissions (not banned) + mdp si mdp
	- *DB: add to channel*: user to channel.members[]
	- *returns*: channel

## Get channel list
1. **Front**: block
	- *envoie*: user: ChannelUserCto *ou UserCto* cf @getUser?
2. **Back**:
    - *recupere*: 

# Message
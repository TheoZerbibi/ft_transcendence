# TODO AUTH

## CALLBACK
- [] check if states are matching, if not, it means a third party changed the state.
- [] check the port (ie localhost:3000/api/auth/callback)
>>>>>>> features/chat-api
- [x] get the user info => auth.service
- [] onboarding if user doesn't already exist
- [] else redirect to homepage or game
- [] 2FA
=======
- [] check the port (ie localhost:3000/api/auth/callback)
>>>>>>> f54b82a (feat: callback route en cours)
=======
- [] get the user info
=======
- [x] get the user info => auth.service
>>>>>>> 810a111 (feat: exploring user store)
- [] onboarding if user doesn't already exist
- [] else redirect to homepage or game
- [] 2FA
>>>>>>> aa96008 (fix: new todos)
>>>>>>> features/chat-api


legend : x ended, t testing phase, i implementing phase

 (send updated collection of object to replace one in front, or send affected element)

- Deco/Connection
- [t] handleConnection { Add user and all his active channel, send list of connected user by channel to everyone}
> Need to get user from token
- [ ] handleDisconnect { remove user and reference of user in all channel with connected user .}

- creation
- [t] channel-creation:				@Post('create')
- [t] Channel-joined:				@Post(':channel_name/join')
- [t] new-message:				@Post(':channel_name/new_message')


// these three can be done with channel-user-updated: need to see front implementation of channel user
- [t] channel-user-update
> - [t]	@Patch(':channel_name/settings/owner/set_user_as_admin')
> - [t]   @Patch(':channel_name/settings/admin/general')
> - [t]   @Patch(':channel_name/settings/admin/mod_user')


- deletion
- [t] channel-quitted: 	@Delete(':channel_name/leave')
- [t] channel-deleted: 	@Delete(':channel_name')

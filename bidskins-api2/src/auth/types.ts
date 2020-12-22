export interface SteamLoginResponse {
	id: string
	displayName: string
	_json: {
		steamid: string
		communityvisibilitystate: number
		profilestate: number
		personaname: string
		commentpermission: number
		profileurl: string
		avatar: string
		avatarmedium: string
		avatarfull: string
		avatarhash: string
		lastlogoff: number
		personastate: number
		realname: string
		primaryclanid: string
		timecreated: number
		personastateflags: number
		loccountrycode: string
		locstatecode: string
		loccityid: number
	}
}

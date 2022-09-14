const request = require("supertest");
const app = require("../app.js");
const { hashPassword } = require("../helpers/bcryptjs.js");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { redis } = require("../config/redis");

let counter = 1;
//query games

// /games?pages=1&size=10&search=

beforeAll(() => {
	redis.get = jest.fn();

	//mock = manipulasi function 3rd party jadi fungsi kita sendiri

	redis.get.mockImplementationOnce(() => {
		return `
		[
			{
        "id":
        "name": "League of Legends: Wild Rift",
        "gameImg": "https://www.riotgames.com/darkroom/1440/08bcc251757a1f64e30e0d7e8c513d35:be16374e056f8268996ef96555c7a113/wr-cb1-announcementarticle-banner-1920x1080.png",
        "youtubeUrl": "https://www.youtube.com/watch?v=TFzkbos0oeo",
        "gameUrl": "https://wildrift.leagueoflegends.com/en-gb/",
        "releaseDate": "2020-10-27",
        "developer": "RIOT GAMES",
        "genre": "Multiplayer online battle arena"
      },
      {
        "id":
        "name": "Mobile Legends: Bang Bang",
        "gameImg": "https://cdn0-production-images-kly.akamaized.net/Hyl2S_OHDEDCGayRTeriz3hPi38=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/3488932/original/008102000_1624278462-Mobile_Legends_11.jpg",
        "youtubeUrl": "https://www.youtube.com/watch?v=cftqT7au9gk",
        "gameUrl": "https://m.mobilelegends.com/en",
        "releaseDate": "2016-07-14",
        "developer": "Moonton",
        "genre": "Multiplayer online battle arena"
      },
      {
        "id":
        "name": "Arena Of Valor",
        "gameImg": "https://gamebrott.com/wp-content/uploads/2020/11/arena_of_valor.jpg",
        "youtubeUrl": "https://www.youtube.com/watch?v=JM_UdSUW1ao",
        "gameUrl": "https://www.arenaofvalor.com/",
        "releaseDate": "2016-10-13",
        "developer": "Tencet Games",
        "genre": "Multiplayer online battle arena"
      },
      {
        "id":
        "name": "VALORANT",
        "gameImg": "https://cdn1-production-images-kly.akamaized.net/2cz3nNAb61C_WtZDIByp9jys2Ww=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/3142622/original/000361800_1591163362-valorant-2.jpg",
        "youtubeUrl": "https://www.youtube.com/watch?v=IhhjcB2ZjIM",
        "gameUrl": "https://playvalorant.com/id-id/",
        "releaseDate": "2020-06-02",
        "developer": "RIOT GAMES",
        "genre": "FPS"
      },
      {
        "id":
        "name": "CS:GO",
        "gameImg": "https://estnn.com/wp-content/uploads/2022/05/20491388.jpg",
        "youtubeUrl": "https://www.youtube.com/watch?v=edYCtaNueQY",
        "gameUrl": "https://blog.counter-strike.net/",
        "releaseDate": "2012-08-21",
        "developer": "Valve Corporation",
        "genre": "FPS"
      },
      {
        "id":
        "name": "Garena Free Fire",
        "gameImg": "https://aidsindonesia.or.id/wp-content/uploads/2021/12/Garena-Free-Fire.jpg",
        "youtubeUrl": "https://www.youtube.com/watch?v=pKUu6PKNyzk",
        "gameUrl": "https://ff.garena.com/en/",
        "releaseDate": "2017-12-04",
        "developer": "111dots Studio",
        "genre": "Battle royale"
      },
      {
        "id":
        "name": "PUBG Mobile",
        "gameImg": "https://c4.wallpaperflare.com/wallpaper/320/205/156/pubg-mobile-wallpaper-preview.jpg",
        "youtubeUrl": "https://www.youtube.com/watch?v=uCd6tbUAy6o",
        "gameUrl": "https://www.pubgmobile.com/id/home.shtml",
        "releaseDate": "2018-03-19",
        "developer": "Tencent Games",
        "genre": "Battle royale"
      },
      {
        "id":
        "name": "DOTA 2",
        "gameImg": "https://cdn.akamai.steamstatic.com/steam/apps/570/header.jpg?t=1662588548",
        "youtubeUrl": "https://www.youtube.com/watch?v=SmnqsdeHFT0",
        "gameUrl": "https://www.dota2.com",
        "releaseDate": "2013-07-09",
        "developer": "Valve Corporation",
        "genre": "Multiplayer online battle arena, Entertainment, Fantasy, Action role-playing game, Speculative fiction, Societal"
      },
      {
        "id":
        "name": "FIFA 23",
        "gameImg": "https://assets.promediateknologi.com/crop/0x0:0x0/x/photo/2022/07/20/3788213003.jpg",
        "youtubeUrl": "https://www.youtube.com/watch?v=o3V-GvvzjE4",
        "gameUrl": "https://www.pubgmobile.com/id/home.shtml",
        "releaseDate": "2022-09-30",
        "developer": "EA Vancouver, EA Canada & EA Romania",
        "genre": "Sports Video Game, Simulation Game, Simulation, Sports"
      },
      {
        "id":
        "name": "TEKKEN 7",
        "gameImg": "https://image.api.playstation.com/vulcan/img/rnd/202111/1200/u36iCgbHmBSZoHOIm3GeKmii.jpg?w=940&thumb=false",
        "youtubeUrl": "https://www.youtube.com/watch?v=1V-_q3SKh5w",
        "gameUrl": "https://tk7.tekken.com",
        "releaseDate": "2015-02-18",
        "developer": "BNE Entertainment, BANDAI NAMCO Studios",
        "genre": "Fighting game, Sports Video Game, Beat 'em up, Simulation Game"
      },
      {
        "id":
        "name": "NBA 2K23",
        "gameImg": "https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/2022/07/08/6ebaff4b-0bff-493f-9e0d-8b1f3276-20220708013259.jpg",
        "youtubeUrl": "https://www.youtube.com/watch?v=rBZ_q6wIJKY",
        "gameUrl": "https://nba.2k.com/2k23/",
        "releaseDate": "2022-09-09",
        "developer": "Tencent Games",
        "genre": "Simulation Video Game, Sports Video Game, Simulation Game, Simulation, Sports"
      }
    ]`;
	});
});

afterEach(() => {
	jest.clearAllMocks();
});

it("fetch games", function (done) {
	request(app).get("/games?pages=1&size=10&search=").expect(200).end();
});

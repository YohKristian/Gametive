const { Team } = require("../models");
const { redis } = require("../config/redis");

class TeamController {
	static async getAllTeam(req, res, next) {
		try {
			const lastUserChache = await redis.get("app:captain");
			if (req.user.username !== lastUserChache) {
				const data = await Team.findAll({
					where: {
						CaptainName: req.user.username,
						statusTeam: "Active",
					},
					order: [["id", "desc"]],
				});

				await redis.set("app:captain", req.user.username)

				await redis.set("app:teams", JSON.stringify(data));

				res.status(200).json(data);
			} else {
				const teamsDataCache = JSON.parse(await redis.get("app:teams"));

				res.status(200).json(teamsDataCache);
			}
		} catch (error) {
			next(error);
		}
	}

	static async getDetailTeam(req, res, next) {
		try {
			const teamId = +req.params.teamId;

			const lastIdCache = await redis.get("app:teamId");

			if (teamId !== lastIdCache) {
				const data = await Team.findByPk(teamId);

				if (!data) throw { code: 40 };

				await redis.set("app:teamId", teamId);

				await redis.set("app:team", JSON.stringify(data));

				res.status(200).json(data);
			} else {
				const teamDetail = JSON.parse(await redis.get("app:team"));

				res.status(200).json(teamDetail);
			}
		} catch (error) {
			next(error);
		}
	}

	static async createTeam(req, res, next) {
		try {
			console.log(req.body);
			const newTeam = {
				name: req.body.name,
				CaptainName: req.user.username,
				MemberName1: req.body.MemberName1,
				MemberName2: req.body.MemberName2,
				MemberName3: req.body.MemberName3,
				MemberName4: req.body.MemberName4,
				BenchMemberName1: req.body.BenchMemberName1,
				BenchMemberName2: req.body.BenchMemberName2,
			};

			const data = await Team.create(newTeam);

			await redis.del("app:teams");
			await redis.del("app:teamId");
			await redis.del("app:captain");

			res.status(201).json(data);
		} catch (error) {
			next(error);
		}
	}

	static async editTeam(req, res, next) {
		try {
			const teamId = req.params.teamId;

			const findTeam = await Team.findByPk(teamId);

			if (!findTeam) throw { code: 41 };

			if (findTeam.CaptainName !== req.user.username) throw { code: 43 };

			const updateTeam = {
				name: req.body.name,
				CaptainName: req.user.username,
				MemberName1: req.body.MemberName1,
				MemberName2: req.body.MemberName2,
				MemberName3: req.body.MemberName3,
				MemberName4: req.body.MemberName4,
				BenchMemberName1: req.body.BenchMemberName1,
				BenchMemberName2: req.body.BenchMemberName2,
			};

			const data = await Team.update(updateTeam, {
				where: {
					id: teamId,
				},
			});

			await redis.del("app:teams");
			await redis.del("app:teamId");
			await redis.del("app:captain");

			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}

	static async deleteTeam(req, res, next) {
		try {
			const teamId = req.params.teamId;

			const findTeam = await Team.findByPk(teamId);

			if (!findTeam) throw { code: 42 };

			if (findTeam.CaptainName !== req.user.username) throw { code: 44 };

			await Team.update(
				{ statusTeam: "Deleted" },
				{
					where: {
						id: teamId,
					},
				},
			);

			await redis.del("app:teams");
			await redis.del("app:teamId");
			await redis.del("app:captain");

			res.status(200).json({
				message: "Success Delete Team",
			});
		} catch (error) {
			next(error);
		}
	}
}

module.exports = TeamController;

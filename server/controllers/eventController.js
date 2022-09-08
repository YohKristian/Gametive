const { Event, Game, Location, sequelize } = require("../models");
class Controller {
  static async showAllEvent(req, res, next) {
    try {
      let data = await Event.findAll({ include: [Game, Location] });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async addEvent(req, res, next) {
    let t= await sequelize.transaction()
    try {
      const {
        eventName,
        description,
        price,
        rules,
        eventStatus,
        eventPoster,
        eventDate,
        eventType,
        UserId,
        GameId,
        locationName,
        LocationId,
        ProvinceId,
        RegencyId
      } = req.body;

      let locationCreate= await Location.create({name: locationName,ProvinceId, RegencyId},{transaction : t})
      
      let data = await Event.create({
        name: eventName,
        description,
        price,
        rules,
        eventStatus: "Pending",
        eventPoster,
        eventDate,
        eventType,
        UserId: req.user.id,
        GameId,
        LocationId: locationCreate.id
      },{transaction : t});

      if(typeof eventName !== "string"){
        let result= []
        for(let i = 0 ; i < eventName.length; i ++){
            let element= {LocationId: locationCreate.id}
            element.eventName= eventName[i]
            element.description= description[i]
            element.price= price[i]
            element.rules= rules[i]
            element.eventPoster= eventPoster[i]
            element.eventDate= eventDate[i]
            element.eventType= eventType[i]
            element.GameId= GameId[i]
            result.push(element)
        }
        await Event.bulkCreate(result, {transaction: t})
      }else{
        await Event.bulkCreate({
            name: eventName,
            description,
            price,
            rules,
            eventStatus: "Pending",
            eventPoster,
            eventDate,
            eventType,
            UserId: req.user.id,
            GameId,
            LocationId: locationCreate.id
          }, {transaction: t})
      }
      await t.commit()
      res.status(201).json(data)
    } catch (error) {
        await t.rollback()
        next(error)
    }
  }

  static async showEventDetail(req, res, next) {
    try {
        const {id}= req.params
        const data= await Event.findOne({where: {id:id}, include: [Game,Location]})
        if(!data){
            throw({code: 20})
        }
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
  }

  static async editEvent(req, res, next) {
    try {
        const {id}= req.params
        const {
            eventName,
            locationName,
            description,
            price,
            rules,
            eventPoster,
            eventDate,
            eventType,
            GameId,
            ProvinceId,
            RegencyId
          } = req.body;
          const events= await Event.findOne({where:{id:id}})
          const lokasi= await Location.findOne({where:{id: events.LocationId}})
        const data= await Event.update({
            name: eventName,
            description,
            price,
            rules,
            eventPoster,
            eventDate,
            eventType,
            GameId,
            LocationId: lokasi.id
          },{where: {id:id}})
          await Location.update({name:locationName, ProvinceId, RegencyId},{where: {id: lokasi.id}})
          res.status(200).json({message: 'Success edit event'})
    } catch (error) {
        next(error)
    }
  }

  static async patchStatus(req, res, next) {
    try {
        const {id}= req.params
        const {eventStatus}= req.body
        let data= await Event.update({eventStatus: "Inactive"},{where: {id:id}})
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
  }
}

module.exports = Controller;

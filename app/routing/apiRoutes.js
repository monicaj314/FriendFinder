var friends = require("../data/friends");


module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {

    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: 100
    };

    var userData = req.body;
    var userPoints = userData.points;

    var totalDifference = 0;

    for (var i = 0; i < friends.length; i++) {
      totalDifference = 0;
      for (var x = 0; x < friends[i].points[x]; x++) {
        totalDifference += Math.abs(parseInt(userPoints[x]) - parseInt(friends[i].points[x]));
        if (totalDifference <= bestMatch.friendDifference) {
          bestMatch.name = friends[i].name;
          bestMatch.photo = friends[i].photo;
          bestMatch.friendDifference = totalDifference;
        }
      }
    }

    friends.push(userData);
    res.json(bestMatch);

  });

};
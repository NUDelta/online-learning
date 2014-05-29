templateOrder = {
  'first':'compare1',
  'second': 'compareFeedback',
  'third': 'teachingModule2',
  'fourth': 'verticalLines',
  'fifth': 'verticalLinesFeedback',
  'sixth': 'teachingModule1',
  'seventh': 'rangeExercise',
  'eighth': 'choose1',
  'ninth': 'choose1Feedback',
  'tenth': 'teachingModule3',
  'eleventh': 'teachingModule4',
  'twelfth': 'visualRank',
  'thirteenth': 'visualRankFeedback'
}

heatMapWeight = {
  "cosmetic": 50,
  "minor": 75,
  "major": 100,
  "catastrophic": 125
};

imageMap = {
  'test1': 'heatmapArea1',
  'test2': 'heatmapArea2'
}

imageIdentifier = {
  'abc': 'testing1',
  'def': 'testing2',
  'ghi': 'testing3',
  'jkl': 'testing4',
  'mno': 'testing5'
}

userGroupIdentifier = {
  'aXcy2': 'scaffolding',
  'gMih5': 'no-scaffolding'
}

visualRankElements = [{id: 'communityBulletin', title: 'Community Bulletin', avg: 0}, {id: 'favoriteTags', title: 'Favorite Tags', avg: 0}, {id: 'askAQuestion', title: 'Ask a Question', avg: 0}, {id: 'personalProfile', title: 'Personal Profile', avg: 0}, {id: 'help', title: 'Help', avg: 0}, { id: 'stackExchange', title: 'Stack Exchange', avg: 0}, {id: 'questions', title: 'Questions', avg: 0}, {id: 'hotNetworkQuestions', title: 'Hot Network Questions', avg: 0}];


ChooseOne = new Meteor.Collection("chooseOne");
VerticalLineFeedback = new Meteor.Collection("verticalLineFeedback");
VisualRankFeedback = new Meteor.Collection("visualRankFeedback");
WrittenHeuristics = new Meteor.Collection("writtenHeuristics");
HierarchyElements = new Meteor.Collection("hierarchyElements");
HierarchyHeuristics = new Meteor.Collection("hierarchyHeuristics");



if(Meteor.isClient){

  // Routing the entire 
  Router.map(function () {
    this.route('first-block', {
      path: '/1', // match the root path
      template: templateOrder.first,
      data: {
        current: 1
      }
    }),
    this.route('second-block', {
      path: '/2',
      template: templateOrder.second,
      data: {
        current: 2
      }
    }),
    this.route('third-block', {
      path: '/3',
      template: templateOrder.third,
      data: {
        current: 3
      }
    }),
    this.route('fourth-block', {
      path: '/4',
      template: templateOrder.fourth,
      data: {
        current: 4
      }
    }),
    this.route('fifth-block', {
      path: '/5',
      template: templateOrder.fifth,
      data: {
        current: 5
      }
    }),
    this.route('sixth-block', {
      path: '/6',
      template: templateOrder.sixth,
      data: {
        current: 6
      }
    }),
    this.route('seventh-block', {
      path: '/7',
      template: templateOrder.seventh,
      data: {
        current: 7
      }
    }),
    this.route('eighth-block', {
      path: '/8',
      template: templateOrder.eighth,
      data: {
        current: 8
      }
    }),
    this.route('ninth-block', {
      path: '/9',
      template: templateOrder.ninth,
      data: function(){
        reason = ChooseOne.find().fetch();
        return {reasons: reason};
      }
    }),
    this.route('tenth-block', {
      path: '/10',
      template: templateOrder.tenth,
      data: {
        current: 10
      }
    }),
    this.route('eleventh-block', {
      path: '/11',
      template: templateOrder.eleventh,
      data: {
        current: 11
      }
    }),
    this.route('twelfth-block', {
      path: '/12',
      template: templateOrder.twelfth,
      data: {
        current: 12
      }
    }),
    this.route('thirteenth-block', {
      path: '/13',
      template: templateOrder.thirteenth,
      data: function(){
        for(var i=0; i < visualRankElements.length; i++){
          currentTotal = 0;
          numberTotal = 0;
          VisualRankFeedback.find({elementName: visualRankElements[i].id}).map(function(doc) {
            currentTotal += doc.value;
            numberTotal += 1;
          });

          visualRankElements[i].avg = numberTotal;
        }

        return {rankings: visualRankElements};
      }
    })

    this.route('BeginHeuristics', {
      path: '/begin-heuristics',
      template: 'BeginHeuristics'
    });

    this.route('ViewHeuristics', {
      path: '/view-heuristics/:_test',
      template: 'ViewHeuristics',
      data: function(){
        differentials = LineDifferentials.find({image: this.params._test}).fetch();
        reports = WrittenHeuristics.find({image: this.params._test}, {sort: {date_created: -1}}).fetch();
        return {reports: reports, imageClass: imageMap[this.params._test]};
      }
    });

    this.route('HierarchyHeuristics', {
      path: '/hierarchy-heuristic/:_image/:_study_group',
      template: 'HierarchyHeuristics',
      data: function(){
        items = HierarchyElements.find({imageName: imageIdentifier[this.params._image]}).fetch();
        return {items: items, image: imageIdentifier[this.params._image], user_group: userGroupIdentifier[this.params._study_group]};
      }
    });

    this.route('WrittenHeuristics', {
      path: '/written-heuristic/:_image/:_study_group',
      template: 'WrittenHeuristics',
      data: function(){
        return {image: imageIdentifier[this.params._image], user_group: userGroupIdentifier[this.params._study_group]};
      }
    });

    this.route('BeginTesting', {
      path: '/begin-testing/:_study_group',
      template: 'beginTesting',
      data: function(){
        return {group: this.params._study_group};
      }
    });

    this.route('Intro', {
      path: '/index',
      template: 'intro'
    });
  });

  /*

    Template event listeners

  */  
  Template.intro.events({
    'click #next': function() {
      Router.go('/1');
    }
  })

  Template.compareFeedback.events({
    'click #next': function() {
      newPath = parseInt(Router.current().path.substring(1));
      newPath = newPath + 1;

      Router.go('/' + newPath);
    },
    'mouseover #strongVertical': function() {
      var c = document.getElementById("target_form_canvas");
      var ctx = c.getContext("2d");
      ctx.moveTo(10,0);
      ctx.lineTo(10, 400);
      ctx.stroke();

      var d = document.getElementById("michaels_form_canvas");
      var dtx = d.getContext("2d");
      dtx.moveTo(350,0);
      dtx.lineTo(350,400);
      dtx.stroke();

      dtx.moveTo(190,0);
      dtx.lineTo(190,400);
      dtx.stroke();
      var description = "Both forms contain strong vertical lines - the form on the left is vertically aligned to the left and the form on the right is vertically aligned to the right.";
      $("#description").html(description);
    }, 
    'mouseleave #strongVertical': function() {
      var c = document.getElementById("target_form_canvas");
      var context = c.getContext('2d');
      context.beginPath();
      context.clearRect(0, 0, c.width, c.height);

      var d = document.getElementById("michaels_form_canvas");
      var dontext = d.getContext('2d');
      dontext.beginPath();
      dontext.clearRect(0,0, d.width, d.height);
      $("#description").html("");

    },
    'mouseover #buttonLine': function() {
      var c = document.getElementById("target_form_canvas");
      var ctx = c.getContext("2d");
      ctx.moveTo(10,0);
      ctx.lineTo(10, 400);
      ctx.stroke();

      var d = document.getElementById("michaels_form_canvas");
      var dtx = d.getContext("2d");
      dtx.moveTo(345,0);
      dtx.lineTo(345,400);
      dtx.stroke();

      var description = "Both forms have buttons that help advance the forms.  In one form, the button is aligned to the left ON the strong vertical line, and in the other form, the button is aligned to the right on the strong vertical line as well.";
      $("#description").html(description);
    }, 
    'mouseleave #buttonLine': function() {
      var c = document.getElementById("target_form_canvas");
      var context = c.getContext('2d');
      context.beginPath();
      context.clearRect(0, 0, c.width, c.height);

      var d = document.getElementById("michaels_form_canvas");
      var dontext = d.getContext('2d');
      dontext.beginPath();
      dontext.clearRect(0,0, d.width, d.height);
      $("#description").html("");
    }
  });

  Template.teachingModule1.events({
    // move to the next page
    'click #next': function() {
      newPath = parseInt(Router.current().path.substring(1));
      newPath = newPath + 1;

      Router.go('/' + newPath);
    },
    'click #showMore1': function() {
      $("#showMore1").fadeOut('slow', function(){
        $("#moreInfo1").fadeIn('slow');
        $("#showMore2").fadeIn('slow');
      });
    },
    'click #showMore2': function() {
      $("#showMore2").fadeOut('slow', function(){
        $("#moreInfo2").fadeIn('slow');
        $("#next").fadeIn('slow');
      });
    }
  });
  Template.teachingModule2.events({
    // move to the next page
    'click #next': function() {
      newPath = parseInt(Router.current().path.substring(1));
      newPath = newPath + 1;

      Router.go('/' + newPath);
    },
    'click #showMore1': function(){
      $("#showMore1").fadeOut('slow', function(){
        $("#moreInfo1").fadeIn('slow');
      });
    },
    'click #misalign': function(){
      if($("#misalign").html() == "Misalign Text"){
        $(".text-align-example").css("text-align", "center");
        $("#misalign").html("Realign Text");
        $("#moreInfo2").fadeIn('slow');
        $("#next").fadeIn('slow');
      } else {
        $(".text-align-example").css("text-align", "left");
        $("#misalign").html("Misalign Text");
      }
    }
  });
  Template.verticalLines.events({
    // move to the next page
    'click #next': function() {
      try{
        lines = JSON.parse($("#lineArray").val());
      }catch(err){
        lines = [];
      }
      
      for(var i=0; i < lines.length; i++){
        VerticalLineFeedback.insert({x_coordinate: lines[i]});
      }

      newPath = parseInt(Router.current().path.substring(1));
      newPath = newPath + 1;

      Router.go('/' + newPath);
    }
  });

  Template.verticalLinesFeedback.events({
    'click #next': function(){
      newPath = parseInt(Router.current().path.substring(1));
      newPath = newPath + 1;

      Router.go('/' + newPath);
    }
  });

  Template.verticalLinesFeedback.totalLines = function(){
    return VerticalLineFeedback.find().fetch().length;
  }

  Template.verticalLinesFeedback.invokeAfterLoad = function() {
    Meteor.defer(function(){
      setTimeout(100, function(){
        console.log("wait");
      });
      lines = VerticalLineFeedback.find().fetch();
      setTimeout(100, function(){
        console.log("wait");
      });
      var c = document.getElementById("vertical_canvas");
      var ctx = c.getContext("2d");
      console.log(lines);

      for(var i=0; i < lines.length; i++){
        ctx.moveTo(lines[i].x_coordinate,0);
        ctx.lineTo(lines[i].x_coordinate,550);
        ctx.lineWidth = 1;
        ctx.stroke();
        console.log(lines[i].x_coordinate);
      }
    });
  }

  Template.rangeExercise.events({
    // move to the next page
    'click #next': function() {
      newPath = parseInt(Router.current().path.substring(1));
      newPath = newPath + 1;

      Router.go('/' + newPath);
    },
    'click #showMore1': function() {
      $("#showMore1").fadeOut('slow', function(){
        $("#moreInfo1").fadeIn('slow');
        $("#next").fadeIn('slow');
      });
    }
  });
  Template.compare1.events({
    // move to the next page
    'click #next': function() {
      newPath = parseInt(Router.current().path.substring(1));
      newPath = newPath + 1;

      Router.go('/' + newPath);
    }
  });
  Template.choose1.events({
    'click #next': function() {
      ChooseOne.insert({chosen: $("#chooseForm").val(), reason: $("#reason").val()});
      
      newPath = parseInt(Router.current().path.substring(1));
      newPath = newPath + 1;
      Router.go('/' + newPath);
    } 
  });

  Template.teachingModule3.events({
    'click #next': function() {
      newPath = parseInt(Router.current().path.substring(1));
      newPath = newPath + 1;
      Router.go('/' + newPath);
    },
    'click #showMore1': function() {
      $("#showMore1").fadeOut('slow', function(){
        $("#moreInfo1").fadeIn('slow');
        $("#next").fadeIn('slow');
      });
    }
  });

  Template.choose1Feedback.events({
    'click #next': function() {
      newPath = parseInt(Router.current().path.substring(1));
      newPath = newPath + 1;
      Router.go('/' + newPath);
    }
  });

  Template.choose1Feedback.targetProportion = function(){
    reasons = ChooseOne.find().fetch();
    numberOfTarget = 0;
    for(var i=0; i < reasons.length; i++){
      if(reasons[i].chosen == "target"){
        numberOfTarget = numberOfTarget + 1;
      }
    }
    return ((numberOfTarget/reasons.length) * 100).toFixed(2) + "%";
  }

  Template.choose1Feedback.michaelsProportion = function(){
    reasons = ChooseOne.find().fetch();
    numberOfTarget = 0;
    for(var i=0; i < reasons.length; i++){
      if(reasons[i].chosen == "michaels"){
        numberOfTarget = numberOfTarget + 1;
      }
    }
    return ((numberOfTarget/reasons.length) * 100).toFixed(2) + "%";
  }

  Template.teachingModule4.events({
    'click #next': function(){
      newPath = parseInt(Router.current().path.substring(1));
      newPath = newPath + 1;
      Router.go('/' + newPath);
    },
    'click #showMore1': function(){
      $("#showMore1").fadeOut('slow', function(){
        $("#moreInfo1").fadeIn('slow');
        $("#next").fadeIn('slow');
      });
    }
  });

  Template.visualRank.events({
    'click #next': function(){
      list = $("li");
      for(var i=0; i < list.length; i++){
        currentId = $(list[i]).attr("id");
        sum = VisualRankFeedback.findOne({elementName: currentId});

        if(typeof sum != "undefined"){
          
          avg = sum.avg;
          count = sum.count;
          newAverage = ((count*avg) + (i+1))/(count+1);
          VisualRankFeedback.update({_id: sum._id}, { $set : {avg: newAverage, count: (count+1)}});
        } else{
          avg = i+1;
          count = 1;
          VisualRankFeedback.insert({elementName: currentId, avg: avg, count: count});
        }
      }

      newPath = parseInt(Router.current().path.substring(1));
      newPath = newPath + 1;
      Router.go('/' + newPath);
    }
  });

  Template.visualRankFeedback.events({
    'click #showMore1': function(){
      $("#showMore1").fadeOut('slow', function(){
        $("#moreInfo1").fadeIn('slow');
        $("#next").fadeIn('slow');
      });
    },
    'click #next': function(){
      random = Math.floor(Math.random()*2);
      if(random == 0){
        Router.go('/begin-testing/' + 'gMih5');
      } else {
        Router.go('/begin-testing/' + 'aXcy2');
      }
    }
  });

  Template.visualRankFeedback.invokeAfterLoad = function() {
    Meteor.defer(function(){
      for(var i=0; i < visualRankElements.length; i++){
        //console.log(visualRankElements[i].avg);
        id = "#" + visualRankElements[i].id;
        console.log(visualRankElements[i].id);
        average = VisualRankFeedback.find({elementName: visualRankElements[i].id}).fetch();
        console.log(average);
        $(id).html(visualRankElements[i].title + "<span class='pull-right'><b>" + average[0].avg.toFixed(2) + "</b></span>");
      }
    });
  }

  /*Template.BeginHeuristics.events({

  });*/

  Template.ViewHeuristics.events({
    'click #loadMap': function() {
      image = Router.current().path.substring(17);
      $("#loadMap").hide();
      $("#" + imageMap[image]).removeClass("grayedOut");
      reports = WrittenHeuristics.find({image: image}, {sort: {date_created: -1}}).fetch();

      heatMapData = {
        max: 200,
        data: []
      };

      for(var i=0; i < reports.length; i++){
        newObject = {x: reports[i].coordinates[0], y: reports[i].coordinates[1], count: heatMapWeight[reports[i].priority]};
        heatMapData.data.push(newObject);
      }

      config = {
        element: document.getElementById(imageMap[image]),
        radius: 30,
        opacity: 50,
        gradient: { 0.45: "rgb(0,0,255)", 0.55: "rgb(0,255,255)", 0.65: "rgb(0,255,0)", 0.95: "yellow", 1.0: "rgb(255,0,0)" }
      };
      //creates and initializes the heatmap
      heatmap = h337.create(config);
      heatmap.store.setDataSet(heatMapData);
    },
    'change #priority': function() {
      priority = $("#priority").val();
      image = Router.current().path.substring(17);
      reports = WrittenHeuristics.find({image: image, priority: priority}, {sort: {date_created: -1}}).fetch();

      heatMapData = {
        max: 200,
        data: []
      };

      for(var i=0; i < reports.length; i++){
        newObject = {x: reports[i].coordinates[0], y: reports[i].coordinates[1], count: heatMapWeight[reports[i].priority]};
        heatMapData.data.push(newObject);
      }

      heatmap.store.setDataSet({data:[]});
      heatmap.store.setDataSet(heatMapData);

    }
  });

  Template.ViewHeuristics.priorities = function(){
    image = Router.current().path.substring(17);
    var list = [["Cosmetic Problems: ", 0],["Minor Problems: ", 0],["Major Problems: ", 0], ["Catastrophic Problems: ", 0]];
    cosmetic = WrittenHeuristics.find({image: image, priority: 'cosmetic'}).fetch();
    list[0][1] = cosmetic.length;
    minor = WrittenHeuristics.find({image: image, priority: 'minor'}).fetch();
    list[1][1] = minor.length;
    major = WrittenHeuristics.find({image: image, priority: 'major'}).fetch();
    list[2][1] = major.length;
    catastrophic = WrittenHeuristics.find({image: image, priority: 'catastrophic'}).fetch();
    list[3][1] = catastrophic.length;

    newArray = ["","","",""];
    for(var i=0; i <list.length; i++){
      newArray[i] = list[i][0] + list[i][1];
    }
    return newArray;
  }

  Template.ViewHeuristics.prioritiesList = function(){
    list = ["Cosmetic Problems: ", "Minor Problems: ", "Major Problems: ", "Catastrophic Problems: "];
    return list;
  }

  Template.ViewHeuristics.averageDifferentials = function(){
    image = Router.current().path.substring(17);
    differentials = LineDifferentials.find({image: image}).fetch();
    var total = 0;
    $.each(differentials,function() {
        total += this.differential;
    });

    var avg = total / differentials.length;
    return avg;
  }

  Template.ViewHeuristics.greaterThanOrLessThan = function(){
    image = Router.current().path.substring(17);
    differentials = LineDifferentials.find({image: image}).fetch();
    console.log("Differential array: " + differentials);
    var total = 0;
    $.each(differentials,function() {
        total += this.differential;
    });

    var avg = total / differentials.length;
    if (avg > 0){
      return true;
    } else {
      return false;
    }
  }

  Template.ViewHeuristics.totalUsers = function(array){
    return array.length;
  } 

  Template.HierarchyHeuristics.events({
    'click #submit': function() {
      image = imageIdentifier[Router.current().path.substring(21,24)];
      user_group = userGroupIdentifier[Router.current().path.substring(25)];

      for(var i=0; i < $("li").length; i++){
        elementName = $("ul li:nth-child(" + (i+1) + ")").attr("value");
        value = $("ul li:nth-child(" + (i+1) + ") select").val();

        HierarchyHeuristics.insert({imageName: image, userGroup: user_group, element: elementName, score: value});
      }

      imageHidden = Router.current().path.substring(21,24);
      userGroup = Router.current().path.substring(25);

      Router.go('/written-heuristic/' + imageHidden + '/' + userGroup);

    }
  });

  Template.WrittenHeuristics.events({
    'click #submit': function() {
      currentImage = imageIdentifier[Router.current().path.substring(19,22)];
      user_group = userGroupIdentifier[Router.current().path.substring(23)];

      //heuristic data!
      submittedPriority = $("#priority").val();
      submittedProblem = $("#problem").val();
      submittedFix = $("#fix").val();
      try {
        submittedCoordinates = JSON.parse($("#coordinates").val());
      } catch(err){
        alert("Select the area on the image where the problem is located!");
        return;
      }
      var c = document.getElementById("test1");
      var ctx = c.getContext("2d");
      ctx.beginPath();
      ctx.clearRect(0,0,c.width, c.height);   

      console.log(currentImage + user_group);
      WrittenHeuristics.insert({image: currentImage, userGroup: user_group, priority: submittedPriority, problem: submittedProblem, fix: submittedFix, date_created: Date.now(), coordinates: submittedCoordinates });
      $("#priority").val("");
      $("#problem").val("");
      $("#fix").val("");
      $("#coordinates").val("");
      $("#heuristic").fadeOut(function(){
        $("#more").fadeIn();
      });
    },

    'click #exit': function(){
      image = imageIdentifier[Router.current().path.substring(21,24)];
      user_group = Router.current().path.substring(23);

      random = Math.floor(Math.random()*2);
      if(random == 0){
        Router.go('/begin-testing/' + user_group);
      }
    },

    'click #submitMore': function(){
      $("#more").fadeOut(function(){
        $("#heuristic").fadeIn('slow');
      });
    }
  });
}




if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}


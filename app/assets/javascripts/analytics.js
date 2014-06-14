var Analytics, controller;

$(function() {

  $("#js-analyze").click(function(){
    $.ajax({
      type: "GET",
      url: "/api/logs",
      success: function(data) {
        Analytics.doSingleTableAnalysis(data);
      }
    });
  });

  $("#js-analyze-filtered").click(function(){
    var data, is_valid, _error;
    data = document.getElementById("body_data").value;
    try {
      JSON.parse(data);
      is_valid = true;
    } catch (_error) {
      is_valid = false;
    }
    if (is_valid) {
      $.ajax({
        type: "POST",
        url: "/api/filter",
        data: data,
        success: function(data) {
          Analytics.doSingleTableAnalysis(data);
        }
      });
    } else {
      alert("Invalid JSON");
    }
  });

  $("#js-analyze-grouped").click(function(){
    var data, is_valid, _error;
    data = document.getElementById("body_data").value;
    try {
      JSON.parse(data);
      is_valid = true;
    } catch (_error) {
      is_valid = false;
    }
    if (is_valid) {
      $.ajax({
        type: "POST",
        url: "/api/group",
        data: data,
        success: function(data) {
          Analytics.doGroupAnalysis(data);
        }
      });
    } else {
      alert("Invalid JSON");
    }
  });

  $("#js-analyze-transformed").click(function(){
    var data, is_valid, _error;
    data = document.getElementById("body_data").value;
    try {
      JSON.parse(data);
      is_valid = true;
    } catch (_error) {
      is_valid = false;
    }
    if (is_valid) {
      $.ajax({
        type: "POST",
        url: "/api/transform",
        data: data,
        success: function(data) {
          Analytics.doGroupAnalysis(data);
        }
      });
    } else {
      alert("Invalid JSON");
    }
  });

  $("#js-analyze-measures").click(function(){
    var data, is_valid, _error;
    data = document.getElementById("body_data").value;
    try {
      JSON.parse(data);
      is_valid = true;
    } catch (_error) {
      is_valid = false;
    }
    if (is_valid) {
      $.ajax({
        type: "POST",
        url: "/api/measures",
        data: data,
        success: function(data) {
          Analytics.doSingleTableAnalysis(data);
        }
      });
    } else {
      alert("Invalid JSON");
    }
  });

});

controller = window.parent.DG;

Analytics = {
  controller: window.parent.DG,

  doGroupAnalysis: function(data) {
    console.log(data["groups"])
    var parent_keys = data.template.parent_keys;
    var child_keys = data.template.child_keys;
    var kParentCollectionName = "Parent Table";
    var kChildCollectionName = "Child Table"
    var kParentAttributeList = []
    var kChildAttributeList = []

    // Computes ParentAttributeList and ChildAttributeList to be sent to CODAP
    for (var i = 0; i < parent_keys.length; i++) {
      kParentAttributeList.push({ name : parent_keys[i] });
    }
    for (var i = 0; i < child_keys.length; i++) {
      kChildAttributeList.push({ name : child_keys[i] });
    }

    controller.doCommand( {
      action: 'initGame',
      args: {
        name: "DataInteractive",
        dimensions: { width: 600, height: 400 },
      }
    });
    controller.doCommand( {
      action: 'createCollection',
      args: {
        name: kParentCollectionName,
        attrs: kParentAttributeList,
        childAttrName: kChildCollectionName,
        log: false
      }
    });
    controller.doCommand( {
      action: 'createCollection',
      args: {
        name: kChildCollectionName,
        attrs: kChildAttributeList,
        log: false
      }
    });

    Object.keys(data["groups"]).forEach(function (key) {
      var value = data["groups"][key]
      console.log(value);
      var children = value["child_values"];
      var parent_values = value["parent_values"];
      result = controller.doCommand( {
        action: 'createCase',
        args: {
          collection: kParentCollectionName,
          values: parent_values
        }
      });
      var caseID = result["caseID"]
      controller.doCommand( {
        action: 'createCases',
        args: {
          collection: kChildCollectionName,
          parent: caseID,
          values: children
        }
      });
    })
  },

  // Sample Data Format for doSingleTableAnalysis Function
  // var data = new Object();
  // data['template'] = ["columne_1", "column_2"];
  // data['values'] = [
  //   ["child_1_value_1", "child_1_value_2"],
  //   ["child_1_value_1", "child_1_value_2"],
  //   ["child_1_value_1", "child_1_value_2"]
  // ];
  doSingleTableAnalysis: function(data){
    console.log(data)
    var kParentCollectionName = "Parent Table"
    controller.doCommand({
      action: "initGame",
      args: {
        name: "DataInteractive",
        dimensions: {
          width: 600,
          height: 400
        }
      }
    });
    var attrs_obj = [];
    for (var i=0; i<data["template"].length; i++){
      attrs_obj.push({ name: data["template"][i] });
    }
    controller.doCommand({
      action: "createCollection",
      args: {
        name: kParentCollectionName,
        attrs: attrs_obj,
        log: false
      }
    });
    controller.doCommand({
      action: "createCases",
      args: {
        collection: kParentCollectionName,
        values: data['values']
      }
    });

  }
};

import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { TaskService } from '../services/task.service';
import { LinkService } from '../services/link.service';
import { Task } from '../modals/task';
import { Link } from '../modals/link';

import { gantt } from 'dhtmlx-gantt';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-gan',
  templateUrl: './gan.component.html',
  styleUrls: ['./gan.component.css'],
  providers: [TaskService, LinkService]
})
export class GanComponent implements OnInit {
  @ViewChild('gantt_here', { static: true }) ganttContainer: ElementRef;

  private selectedCampaigns = [
    {key:'Metamizol-Na-C19851',label:'Metamizol-Na-C19851'},
    {key:'Metamizol-Na-C19854',label:'Metamizol-Na-C19854'},
    {key:'Metamizol-Mg-C19852',label:'Metamizol-Mg-C19852'},
    {key:'Metamizol-Mg-C19855',label:'Metamizol-Mg-C19855'},
    {key:'Rifamycin-C19853',label:'Rifamycin-C19853'},

  ];
  private AllCampaigns: [] = [];

  constructor(private taskService: TaskService, private linkService: LinkService) { }

  ngOnInit() {
    gantt.config.xml_date = '%Y-%m-%d %H:%i';
    //gantt.config.autofit= true;
    gantt.config.grid_width = 480;
    gantt.config.row_height = 30;
    gantt.config.order_branch = 'marker';
    gantt.config.sort = true;

    gantt.locale.labels.section_Campaign = "Campaign";
    gantt.locale.labels.section_split = "See Order";

    gantt.config.columns = [

      { name: 'building', label: 'BUILDING', tree: true, align: 'center' },
      { name: 'product', label: 'PRODUCT', align: 'center'},
      { name: 'Campaign', label: 'CAMPAIGN', align: 'center', width: '*'  },
      { name: 'procurement', label: 'ORDER', align: 'center', width:100},
      //{name:"add",label:"",width:35 }
    ];

    gantt.config.lightbox.project_sections = [
      //{ name: "description", height: 70, map_to: "text", type: "textarea" },
      { name: "Campaign", label: 'Campaign', height: 40, type: "textarea", id: 'hello', map_to: "Campaign", options: this.selectedCampaigns },
      {
        name: "split", type: "checkbox", map_to: "render", options: [
          { key: "split", label: "" }
        ]
      },
      { name: "time", type: "duration", map_to: "auto" }
    ];

    gantt.config.lightbox.sections = [
      //{ name: "description", height: 70, map_to: "text", type: "textarea" },
      { name: "Campaign", label: 'Campaign', height: 40, type: "textarea", map_to: "Campaign", options: this.selectedCampaigns },
      { name: "time", type: "duration", map_to: "auto" }
    ];

    gantt.serverList("Campaign", this.selectedCampaigns);

    gantt.plugins({
      multiselect: true,
      auto_scheduling: true,
      grouping: true,
      undo: true,
    });
    gantt.config.auto_scheduling = true;
    gantt.config.drag_multiple = true;
    gantt.config.drag_project = true;
    gantt.config.work_time = true;

    //adding holidays
    var holidays = ["21-04-2021"]

    var format_date = gantt.date.str_to_date("%d-%m-%Y");

    for (var i = 0; i < holidays.length; i++) {
      var converted_date = format_date(holidays[i])
      gantt.setWorkTime({ date: converted_date, hours: false })
    }

    gantt.templates.grid_row_class =
      gantt.templates.task_row_class = function (start, end, task) {
        if (task.$virtual)
          return "summary-row"
      };

    gantt.templates.task_class = function (start, end, task) {
      if (task.$virtual) {
        return "summary-bar";
      }
      if (task.text == "") { return "green" };
    };

    gantt.templates.scale_cell_class = function (date) {
      if (!gantt.isWorkTime(date)) return "weekend";
    };

    gantt.templates.timeline_cell_class = function (task, date) {
      if (!gantt.isWorkTime(date)) return "weekend";
    };

    const zoomModule = gantt.ext.zoom;

    zoomModule.init({
      levels: [
        {
          name: "hour",
          scale_height: 27,
          min_column_width: 30,
          scales: [
            { unit: "day", format: "%d %M" },
            { unit: "hour", format: "%H" },
          ]
        },
        {
          name: "day",
          scale_height: 27,
          min_column_width: 80,
          scales: [
            { unit: "day", step: 1, format: "%d %M" }
          ]
        },
        {
          name: "week",
          scale_height: 50,
          min_column_width: 50,
          scales: [
            {
              unit: "week", step: 1, format: function (date) {
                var dateToStr = gantt.date.date_to_str("%d %M");
                var endDate = gantt.date.add(date, -6, "day");
                var weekNum = gantt.date.date_to_str("%W")(date);
                return "#" + weekNum + ", " + dateToStr(date) + " - " + dateToStr(endDate);
              }
            },
            { unit: "day", step: 1, format: "%j %D" }
          ]
        },
        {
          name: "month",
          scale_height: 50,
          min_column_width: 120,
          scales: [
            { unit: "month", format: "%F, %Y" },
            { unit: "week", format: "Week #%W" }
          ]
        },
        {
          name: "quarter",
          height: 50,
          min_column_width: 90,
          scales: [
            { unit: "month", step: 1, format: "%M" },
            {
              unit: "quarter", step: 1, format: function (date) {
                var dateToStr = gantt.date.date_to_str("%M");
                var endDate = gantt.date.add(gantt.date.add(date, 3, "month"), -1, "day");
                return dateToStr(date) + " - " + dateToStr(endDate);
              }
            }
          ]
        },
        {
          name: "year",
          scale_height: 50,
          min_column_width: 30,
          scales: [
            { unit: "year", step: 1, format: "%Y" }
          ]
        }
      ],
      useKey: "ctrlKey",
      trigger: "wheel",
      element: function () {
        return gantt.$root.querySelector(".gantt_task");
      }
    });

    zoomModule.setLevel("day");

 

    gantt.init(this.ganttContainer.nativeElement);

    Promise.all([this.taskService.get(), this.linkService.get()])
      .then(([data, links]) => {
        gantt.parse({ data, links });
      });


    gantt.attachEvent("onLightboxSave", function (id, task, is_new) {
      var value = gantt.getLightboxSection('Campaign').getValue();
      if (value != "") {
        var json = { key: value, label: value }
        var filtered = this.selectedCampaigns.filter(c => c.key == value);
        if (filtered.length == 0) {
          this.selectedCampaigns.push(json);
        }
        this.AllCampaigns.push(json);
        // console.log("all", this.AllCampaigns)
        // console.log("selected", this.selectedCampaigns)

        // var taskId = gantt.addTask({
        //   text:value,
        //   type:"project",
        //   Campaign:value,
        //   index:1
        // })
        // gantt.getTask(id).parent = taskId;
        // gantt.render();
        return true;
      } else {
        return true;
      }
    }, { thisObject: this })

    gantt.attachEvent("onLightbox", function (task_id) {
      var textarea = document.querySelector("textarea");
      var value = gantt.getLightboxSection('Campaign').getValue();
      const allcamp = this.AllCampaigns;
      const selectcamp = this.selectedCampaigns;
      textarea.onchange = function () {
        for (let [i, user] of allcamp.entries()) {
          if (user.key == value) {
            allcamp.splice(i, 1);
            break;
          }
        }
        let count = allcamp.filter(c => c.key == value).length;
        if (count == 0) {
          for (let [i, user] of selectcamp.entries()) {
            if (user.key == value) {
              selectcamp.splice(i, 1);
            }
          }
        }
      }
    }, { thisObject: this });

    gantt.attachEvent("onLightboxDelete", function (id, item) {
      gantt.attachEvent("onAfterTaskDelete", function (id) {
        let value = gantt.getLightboxSection('Campaign').getValue();
        for (let [i, user] of this.AllCampaigns.entries()) {
          if (user.key == value) {
            this.AllCampaigns.splice(i, 1);
            break;
          }
        }
        let count = this.AllCampaigns.filter(c => c.key == value).length;
        if (count == 0) {
          for (let [i, user] of this.selectedCampaigns.entries()) {
            if (user.key == value) {
              this.selectedCampaigns.splice(i, 1);
            }
          }
        }
        // console.log("all", this.AllCampaigns)
        // console.log("selected", this.selectedCampaigns)
        return true;
      }, { thisObject: this })
      return true
    }, { thisObject: this })

    gantt.attachEvent("onTaskDrag", function (id, mode, task, original) {
      var formatFunc = gantt.date.date_to_str("%d/%m/%Y");
      if (formatFunc(task.start_date) == formatFunc(gantt.getState().min_date)) {
        gantt.getState().min_date = gantt.date.add(gantt.getState().min_date, -1, 'day');
        gantt.render();
        gantt.showDate(gantt.getState().min_date);
      } else if (formatFunc(task.end_date) == formatFunc(gantt.getState().max_date)) {
        gantt.getState().max_date = gantt.date.add(gantt.getState().max_date, 2, 'day');
        gantt.render();
        gantt.showDate(gantt.getState().max_date);
      }
      if (task.type == gantt.config.types.project) {
        gantt.eachTask(function (child) {
          child.constraint_date = null;
        }, task.id)
      }
    }, { thisObject: this });

  }



  showGroups(listname) {
    if (listname) {
      gantt.eachTask(function (task) {
        if (task.parent) {
          let parent = gantt.getTask(task.parent);
          if (parent.type == "project") {
            if (task.Campaign != parent.Campaign) {
              task.Campaign = parent.Campaign
            }
            task.procurement = parent.procurement;
            task.building = parent.building;
            task.product = parent.product;
          }
        }
      })
      gantt.groupBy({
        groups: this.selectedCampaigns,
        relation_property: listname,
        group_id: "key",
        group_text: "label"
      });
      gantt.eachTask(function (task) {
        if (task.$virtual) {
          task.readonly = false;
        }
      })
    }
    else gantt.groupBy(false);
  }

  seeOrder() {
    var elem = <HTMLInputElement>document.getElementById('order');

    if (elem.value == "Expand") {
      gantt.eachTask(function (task) {
        if (task.parent) {
          let parent = gantt.getTask(task.parent);
          if (parent.type == "project") {
            parent.render = 'split'
          }
        }
      })
      gantt.render();
      elem.innerHTML = "Collapse";
      elem.value = "Collapse";

    } else {

      gantt.eachTask(function (task) {
        if (task.parent) {
          let parent = gantt.getTask(task.parent);
          if (parent.type == "project") {
            parent.render = ''
          }
        }
      })
      gantt.render();
      elem.innerHTML = "Expand";
      elem.value = "Expand";
    }
  }

  zoomIn() {
    gantt.ext.zoom.zoomIn();
  }

  zoomOut() {
    gantt.ext.zoom.zoomOut();
  }

  undo() {
    gantt.undo();
  }

  redo() {
    gantt.redo();
  }

  

}

import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { TaskService } from '../services/task.service';
import { LinkService } from '../services/link.service';
import { Task } from '../modals/task';
import { Link } from '../modals/link';

import { gantt } from'dhtmlx-gantt';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-gan',
  templateUrl: './gan.component.html',
  styleUrls: ['./gan.component.css'],
  providers: [TaskService, LinkService]
})
export class GanComponent implements OnInit {
  @ViewChild('gantt_here', {static:true}) ganttContainer: ElementRef;
  
  selectedCampaigns : [] = [];
 
  constructor(private taskService: TaskService, private linkService: LinkService) { }

  ngOnInit() {
    gantt.config.xml_date = '%Y-%m-%d %H:%i';
		//gantt.config.autofit= true;
		gantt.config.grid_width = 450;
		gantt.config.order_branch = 'marker';
		gantt.config.sort = true;

    gantt.locale.labels.section_Campaign = "Campaign";
    gantt.locale.labels.section_split = "See Order";

    gantt.config.columns = [
			
			{name:'building' , label:'BUILDING' , tree:true,align:'center'},
			{name:'product' , label:'PRODUCT',align:'center',width:'*'},
			{name:'Campaign' , label:'CAMPAIGN', align:'center'},
			{name:'procurement' , label:'PROC ORDER', align:'center'}];

      gantt.config.lightbox.project_sections = [
        {name: "description", height: 70, map_to: "text", type: "textarea"},
        {name:"Campaign", label:'Campaign',   height:40, type:"textarea", map_to:"Campaign",options:this.selectedCampaigns}, 
        {name: "split", type:"checkbox", map_to: "render", options:[
          {key:"split", label:""}
      ]},
        {name: "time", type: "duration", map_to: "auto"}
      ];

      gantt.config.lightbox.sections = [
        {name: "description", height: 70, map_to: "text", type: "textarea"},
        {name:"Campaign", label:'Campaign',   height:40, type:"textarea", map_to:"Campaign",options:this.selectedCampaigns}, 
        {name: "time", type: "duration", map_to: "auto"}
      ];

      gantt.serverList("Campaign", this.selectedCampaigns);

      gantt.plugins({ 
        multiselect: true,
        auto_scheduling:true,
        grouping:true
    }); 
    gantt.config.auto_scheduling = true;
    gantt.config.drag_multiple = true;
    gantt.config.drag_project = true;

    //gantt.config.work_time = true;

  gantt.templates.grid_row_class =
	gantt.templates.task_row_class = function (start, end, task) {
			if (task.$virtual)
				return "summary-row"
		};
	gantt.templates.task_class = function (start, end, task) {
		if (task.$virtual){
			return "summary-bar";
    	}
		if (task.text == "") {return "green"};
	};
  // gantt.templates.scale_cell_class = function(date){
	// 	if(!gantt.isWorkTime(date)) return "weekend";
  //     };
	// gantt.templates.timeline_cell_class = function(task,date){
	// 	if(!gantt.isWorkTime(date)) return "weekend" ;
  //     };
	

    gantt.init(this.ganttContainer.nativeElement);

    Promise.all([this.taskService.get(), this.linkService.get()])
            .then(([data, links]) => {
                gantt.parse({data, links});
            });


    gantt.attachEvent("onLightboxSave", function(id, task, is_new){
      var value = gantt.getLightboxSection('Campaign').getValue();
      var json = {key:value,label:value}
      var filtered = this.array.filter(c => c.key == value);
      if (filtered.length == 0) {this.array.push(json);}
     return true;
    }, {thisObject: this})
  
    gantt.attachEvent("onLightboxDelete", function(id){
      var value = gantt.getLightboxSection('Campaign').getValue();
      for (let [i, user] of this.selectedCampaigns.entries()) {
        if (user.key == value) {
          this.array.splice(i, 1);
        }
       }
      
      return true;
    }, {thisObject: this})
  }

  

  showGroups(listname){
    if (listname){
      gantt.eachTask(function(task){
        if (task.parent){
          let parent = gantt.getTask(task.parent);
          if (parent.render == "split"){
            if (task.Campaign != parent.Campaign){
              task.Campaign = parent.Campaign
            }
            
          }
        }
      })
      gantt.groupBy({ 
        groups: this.selectedCampaigns,       
        relation_property: listname,
        group_id: "key",
        group_text: "label"
      });
    }
    else gantt.groupBy(false);
  }
  

}

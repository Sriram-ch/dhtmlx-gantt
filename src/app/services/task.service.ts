import { Injectable } from '@angular/core';
import { Task } from '../modals/task';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent, HttpEventType } from '@angular/common/http';
import { HandleError } from './service-helper';

@Injectable({
	providedIn: 'root'
})
export class TaskService {
	private taskUrl = 'http://localhost:4200/api/task';

	constructor(private http: HttpClient, private httpClient: HttpClient) { }

	get(): Promise<Task[]> {
		return this.http.get(this.taskUrl)
			.toPromise()
			.catch(HandleError);
	}


	insert(task: Task): Promise<Task> {
		return this.http.post(this.taskUrl, task)
			.toPromise()
			.catch(HandleError);
	}

	update(task: Task): Promise<void> {
		return this.http
			.put(`${this.taskUrl}/${task.id}`, task)
			.toPromise()
			.catch(HandleError);
	}

	remove(id: number): Promise<void> {
		return this.http.delete(`${this.taskUrl}/${id}`)
			.toPromise()
			.catch(HandleError);
	}

}
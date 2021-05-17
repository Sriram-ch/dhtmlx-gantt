import { Injectable } from '@angular/core';
import { Link } from '../modals/link';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent, HttpEventType } from '@angular/common/http';
import { HandleError } from './service-helper';


@Injectable({
	providedIn: 'root'
})
export class LinkService {
	private linkUrl = 'http://localhost:4200/api/link';


	constructor(private http: HttpClient, private httpClient: HttpClient) { }

	get(): Promise<Link[]> {
		return this.http.get(this.linkUrl)
			.toPromise()
			.catch(HandleError);
	}

	insert(link: Link): Promise<Link> {
		return this.http.post(this.linkUrl, link)
			.toPromise()
			.catch(HandleError);
	}

	update(link: Link): Promise<void> {
		return this.http.put(`${this.linkUrl}/${link.id}`, link)
			.toPromise()
			.catch(HandleError);
	}

	remove(id: number): Promise<void> {
		return this.http.delete(`${this.linkUrl}/${id}`)
			.toPromise()
			.catch(HandleError);
	}

}
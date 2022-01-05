import { Component, OnInit } from '@angular/core';
import { HttpClient,  HttpHeaders  } from '@angular/common/http';

interface Search {};

export class contributorsStats {
  total : number | undefined;
  weeks : weekActions[] | undefined;
}

export class weekActions {
  w:number= 0;
  a:number= 0;
  d:number= 0;
  c:number= 0;
}

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {

  constructor(private http: HttpClient) { 

  }

  repositories : any;
  baseUrl : string = "https://api.github.com";
  UserGit : string = "";
  RepoGit : string = "";
  repoContrType : any;
  repoContrValue : any;
  repoLang : any;

  ngOnInit(): void {

  }

  userGitHub() {
    this.http.get<Search[]>(`${this.baseUrl}/users/${this.UserGit}/repos`).subscribe(
      (result) => { 
        this.repositories = result;
      },
      (error) =>{
        console.error(error);
      })
  }

  repoContributors() {
    this.http.get<contributorsStats[]>(`${this.baseUrl}/repos/${this.UserGit}/${this.RepoGit}/stats/contributors`).subscribe(
      (result) => { 
        this.repoLang = result;
        console.log(this.repoLang);
      },
      (error) =>{
        console.error(error);
      })
  }
  
  repoLanguage() {
    this.http.get<Search[]>(`${this.baseUrl}/repos/${this.UserGit}/${this.RepoGit}/languages`).subscribe(
      (result) => { 
        this.repoContrType = Object.keys(result);
        this.repoContrValue = Object.values(result);
      },
      (error) =>{
        console.error(error);
      })
  }
}
// https://api.github.com/repos/uneishi/laura-urbain/stats/contributors
  //{{test[0].author.id | json}} <br>
  //{{test[0].author.login | json}}
  /* 
w : {{test[0].weeks[0].w | json}} <br>
a : {{test[0].weeks[0].a | json}} <br>
d : {{test[0].weeks[0].d | json}} <br>
c : {{test[0].weeks[0].c | json}} <br>
*/
  /*
      this.http.get<contributorsStats[]>(`https://api.github.com/repos/uneishi/laura-urbain/stats/contributors`).subscribe(
      (result) => { 
        this.test = result;
        console.log(this.test);
      },
      (error) =>{
        console.error(error);
      })
  */
// https://api.github.com/repos/uneishi/laura-urbain/languages
  // {{test.CSS}} --> result est un enum 
  // this.test = Object.keys(result); --> transforme les noms des languages  
  // this.test = Object.values(result); --> transforme en valeur  
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeopleService } from './people.service';
import { ToastrService } from 'ngx-toastr';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
})
export class PeopleComponent implements OnInit {
  event: any = {};
  people: any = [];
  person: any = {};
  public id: any;
  public name: any;
  selectedFile: any = null;
  listaURL: any;
  public listPath: any;
  progress = 0;
  title = 'TITLE';
  subtitle = 'subtitle';
  filtrado = [];
  salas = new Set();
  selected = null;
  p: number = 1;
  listName: any;
  imgURL: any;
  selectedIMG = (File = null);

  constructor(
    private route: ActivatedRoute,
    private peopleService: PeopleService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.event = history.state.data;
    this.route.params.subscribe((params: any) => {
      this.id = params['id'];
    });
    this.title = this.event.name;
    this.subtitle = this.event.subtitle;
    this.listPeople();
  }

  filter() {
    this.people.forEach((item) => {
      this.salas.add(item.classroom);
    });
  }

  downloadPdf() {
    const data = document.getElementById('content-print');
    html2canvas(data, { scale: 2 }).then((canvas) => {
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'px', 'a4');
      var width = pdf.internal.pageSize.getWidth();
      var height = pdf.internal.pageSize.getHeight();
      pdf.addImage(
        contentDataURL,
        'PNG',
        0,
        0,
        width,
        height,
        undefined,
        'FAST'
      );
      //pdf.output('dataurlnewwindow');
      pdf.save('.pdf');
    });
  }

  onOptionsSelected() {
    this.filtrado = [];
    this.people.forEach((item) => {
      if (item.classroom === this.selected) {
        this.filtrado.push(item);
      }
    });
    this.filtrado.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      } else {
        return null;
      }
    });
  }

  onChange(event: any) {
    this.selectedFile = event.target.files[0];
    this.listName = event.target.files[0].name;
    var reader = new FileReader();
    this.listPath = event;
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (_event) => {
      this.listaURL = reader.result;
    };
    this.progress = 0;
  }

  onChangeIMG(event) {
    this.selectedFile = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  onUpload() {
    const formData = new FormData();
    formData.append('arquivo', this.selectedFile);
    this.peopleService
      .uploadList(this.event.id, formData)
      .subscribe((event: HttpEvent<Object>) => {
        //console.log(event);
        if (event.type === HttpEventType.Response) {
          //console.log('Upload Concluído');
        } else if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round((event.loaded * 100) / event.total);
          //console.log('Progresso', percentDone);
          this.progress = percentDone;
        }
      });
    this.toastr.success('Upload OK!', 'Sucesso!');
  }

  import() {
    this.peopleService.importList(this.event.id, this.person).subscribe(
      () => {
        this.listPeople();
        this.toastr.success('Importação realizada com sucesso');
        this.progress = 0;
        this.listName = '';
      },
      (response) => {
        let msg = 'Erro inesperado';
        if (response.error.fieldMessage) {
          msg = response.error.fieldMessage;
        }
        this.toastr.error(msg, 'Erro!');
      }
    );
  }

  listPeople() {
    this.peopleService
      .listPeople(this.event.id)
      .subscribe((response) => (this.people = <any>response));
  }

  addPerson() {
    this.person.event = this.event;
    this.peopleService.add(this.event.id, this.person).subscribe(
      (response) => {
        this.toastr.success('Registro inserido');
        this.listPeople();
      },
      (error) => {
        this.toastr.error(error.message, 'Erro!');
      }
    );
  }

  updatePerson() {
    this.peopleService.update(this.event.id, this.person).subscribe(() => {
      this.toastr.success('Registro atualizado');
      this.person = {};
      this.listPeople();
    });
  }

  deletePerson() {
    this.peopleService.delete(this.event.id, this.person.id).subscribe(() => {
      this.person = {};
      this.listPeople();
      this.toastr.success('Registro excluído');
    });
  }

  setPerson(person: any) {
    this.person = person;
    //console.log(this.person.id);
  }

  clear() {
    this.person = {};
  }
}

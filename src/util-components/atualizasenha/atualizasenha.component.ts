import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../../viewmodel/usuario/usuario';
import { AlertService } from '../../util/alert/alert.service';
import { UtilService } from '../../util/util.service';
import { SystemHolderService } from '../../util/holder/systemholder.service';
import { ToastyComponent } from '../toasty/toasty.component';
import { LoginService } from '../../login/login.service';

@Component({
  selector: 'app-atualizasenha',
  templateUrl: './atualizasenha.component.html',
  styleUrls: ['./atualizasenha.component.css']
})
export class AtualizasenhaComponent extends AlertService implements OnInit {

  constructor(public util: UtilService,
    public toastyComponent: ToastyComponent,
    public systemHolderService: SystemHolderService,
    private loginService: LoginService) {
    super(toastyComponent);
  }

  public novaSenha: string
  public novaSenha1: string

  ngOnInit() {
  }
  public loadingPass: boolean = false
  public retornin: string
  public atualizaSenha() {
    if (this.novaSenha1 && this.checkDif()) {
      this.loadingPass = true
      let leuser = JSON.parse(sessionStorage.getItem('user'))
      let user: Usuario = {
        login: leuser.user,
        senha: this.novaSenha,
        nivel: leuser.nv
      }
      this.loginService.atualizaSenha(user).then(r => {
        if (r) {
          this.retornin = "Senha atualizada.";
        } else {
          this.retornin = "Ocorreu falha ao atualizar a senha.";
        }
      }, error => {
        console.log(error)
        this.retornin = "Falha ao atualizar a senha.";
      }).then(x => {
        this.loadingPass = false
        this.novaSenha = null
        this.novaSenha1 = null
      })
    } else {
      this.retornin = "Insira corretamente a nova senha nos dois campos, por favor."
    }

  }

  public checkDif() {
    return this.novaSenha === this.novaSenha1
  }
  public close() {
    this.systemHolderService.trocandoSenha = false
  }


}

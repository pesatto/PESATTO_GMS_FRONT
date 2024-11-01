import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UnitService } from '../../service/unit.service';
import { Realbooleans, Unit } from '../../models/unit';
import { ToastrService } from 'ngx-toastr';
import { SocketService } from '../../service/socket.service';
import { AuthService } from '../../service/auth.service';
import { User } from '../../models/user';
import { errorsDic } from '../../service/_01coils';
import {Clipboard} from "@angular/cdk/clipboard"
@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrl: './unit.component.scss'
})
export class UnitComponent implements OnDestroy, OnInit {

  private route = inject(ActivatedRoute);
  baseShare = "https://monitor.pesatto.com/u/"
  unit: Unit = {
    serial: '',
    realvalues: {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
      12: 0,
      13: 0,
      14: 0,
      15: 0,
      16: 0,
      17: 0,
      18: 0,
      19: 0,
      20: 0,
      21: 0,
      22: 0,
      23: 0,
      24: 0,
      25: 0,
      26: 0,
      27: 0,
      28: 0,
      29: 0,
      30: 0,
      31: 0,
      32: 0,
      33: 0,
      34: 0,
      35: 0,
      36: 0,
      37: 0,
      38: 0,
      39: 0,
      40: 0,
      41: 0,
      42: 0,
      43: 0,
      44: 0,
      45: 0,
      46: 0,
      47: 0,
      48: 0,
      49: 0,
      50: 0,
      51: 0,
      52: 0,
      53: 0,
      54: 0,
      55: 0,
      56: 0,
      57: 0,
      58: 0,
      59: 0,
      60: 0,
      61: 0,
      62: 0,
      63: 0,
      64: 0,
      65: 0,
      66: 0,
      67: 0,
      68: 0,
      69: 0,
      70: 0,
      71: 0,
      72: 0,
      73: 0,
      74: 0,
      75: 0,
      76: 0,
      77: 0,
      78: 0,
      79: 0,
      80: 0,
      81: 0,
      82: 0,
      83: 0,
      84: 0,
      85: 0,
      86: 0,
      87: 0,
      88: 0,
      89: 0,
      90: 0,
      91: 0,
      92: 0,
      93: 0,
      94: 0,
      95: 0,
      96: 0,
      97: 0,
      98: 0,
      99: 0,
      100: 0,
      101: 0,
      102: 0,
      103: 0,
      104: 0,
      105: 0,
      106: 0,
      107: 0,
      108: 0,
      109: 0,
      110: 0,
      111: 0,
      112: 0,
      113: 0,
      114: 0,
      115: 0,
      116: 0
    },
    realbooleans: {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
      9: false,
      10: false,
      11: false,
      12: false,
      13: false,
      14: false,
      15: false,
      16: false,
      17: false,
      18: false,
      19: false,
      20: false,
      21: false,
      22: false,
      23: false,
      24: false,
      25: false,
      26: false,
      27: false,
      28: false,
      29: false,
      30: false,
      31: false,
      32: false,
      33: false,
      34: false,
      35: false,
      36: false,
      37: false,
      38: false,
      39: false,
      40: false,
      41: false,
      42: false,
      43: false,
      44: false,
      45: false,
      46: false,
      47: false,
      48: false,
      49: false,
      50: false,
      51: false,
      52: false,
      53: false,
      54: false,
      55: false,
      56: false,
      57: false,
      58: false,
      59: false,
      60: false,
      61: false,
      62: false,
      63: false,
      64: false,
      65: false,
      66: false,
      67: false,
      68: false,
      69: false,
      70: false,
      71: false,
      72: false,
      73: false,
      74: false,
      75: false,
      76: false,
      77: false,
      78: false,
      79: false,
      80: false,
      81: false,
      82: false,
      83: false,
      84: false,
      85: false,
      86: false,
      87: false,
      88: false,
      89: false,
      90: false,
      91: false,
      92: false,
      93: false,
      94: false,
      95: false,
      96: false,
      97: false,
      98: false,
      99: false,
      100: false,
      101: false,
      102: false,
      103: false,
      104: false,
      105: false,
      106: false,
      107: false,
      108: false,
      109: false,
      110: false,
      111: false
    },
    longitude: 0,
    latitude: 0,
    connected: false,
    altitude: 0,
    genvalues: [],
    genbooleans: [],
    _id: '',
    name: '',
    hostid: '',
    simcard: '',
    model: {
      _id: '',
      name: '',
      power: 0,
      voltaje: 0,
      hz: 0,
      rpm: 0,
      battery: 0,
      temp: 0,
      oil: 0,
      __v: 0,
      amps: 0
    },
    company: {
      _id: '',
      name: '',
      rfc: '',
      __v: 0
    },
    __v: 0,
    lastupdate: '00/00/0000',
    createdAt: ''
  }
  loading: boolean = true;
  userType = 0
  user: User = {
    _id: '',
    fullname: '',
    email: '',
    user_type: 0,
    userpassword: '',
    active: false,
    __v: 0,
    company: {
      _id: '',
      name: '',
      rfc: '',
      __v: 0
    }
  }


  constructor(private authService: AuthService,private clipboard: Clipboard,private router: Router ,private socketService: SocketService, private unitService: UnitService, private toast: ToastrService) {
    this.loadUnit(this.route.snapshot.paramMap.get('unitid')!)
    this.user = this.authService.get_user()

  }

  ngOnInit(): void {
    this.socketService.connect()
    this.socketService.join([this.route.snapshot.paramMap.get('unitid')!])
    this.socketService.socket_listener(data => {
      this.unit = { ... this.unit, ...data.data }
    })
  }
  ngOnDestroy(): void {
    this.socketService.disconnect()
  }

  loadUnit(unitId: string) {
    this.unitService.getUnit(unitId).subscribe(data => {
      if (data.error) {
        this.toast.error(data.message, "Error !")
      } else {
        this.unit = data.data
        this.loading = false
      }
    })
  }

  getEntries(values: Realbooleans) {
    const filteredEntries = Object.entries(values)
      .filter(([key, value]) => value && errorsDic.hasOwnProperty(Number(key)))
      .map(([key, value]) => ({ key: Number(key), ...errorsDic[Number(key)] }));
    
    return filteredEntries;
  }

  openHistoric() {
    this.router.navigate(["/home/unit/historic/" + this.unit._id])
  }

  getStatus(status: any) {
    let states = ["En Reposo", "Precalentando", "Salida Combustible", "Marcha", "Descanso de Marcha", "Retraso de Seguridad", "Inicio Ralenty", "Acelerando", "En espera de Carga", "Corriendo Normal", "Enfriando", "Reposo de Paro", "ETS", "Falla en Paro", "Error en Paro", "Retraso Parado"]
    return states[status]
  }
  calculate(should: number, is: number) {
    return (is * 100) / should
  }

  sendCommand(code: string, name: string) {
    this.unitService.sendCommand({ units: this.unit._id, creator: this.user._id, code: code, command: name, hostid: this.unit.hostid }).subscribe(response => {
      if (response.error) {
        this.toast.error(response.message, "Error en Commando")
      } else {
        this.toast.success("Commando " + name + " corrido con exito", "Exito!")
      }
    })
  }

  h5464(base64String: string) {
    // Find the midpoint of the string
    const midpoint = Math.ceil(base64String.length / 2);
  
    // Split the string into two parts
    const part1 = base64String.slice(0, midpoint);
    const part2 = base64String.slice(midpoint);
  
    // Inverse the parts
    const inversePart1 = part1.split('').reverse().join('');
    const inversePart2 = part2.split('').reverse().join('');
  
    // Combine the inversed parts back together
    const result = inversePart2 + inversePart1;
    return result;
  }

  createShare() {
    let date = new Date();
    date.setDate( date.getDate() + 2 );

    let accToken = btoa(JSON.stringify({uuid: this.unit._id, validTo: date, createdBy: this.user._id}))
    this.clipboard.copy(this.baseShare + this.h5464(accToken))
    this.toast.success("Liga copiada")
  }

  calculateColor(should: number, is: number): string {
    const percentage = (is * 100) / should;
    if (percentage < 35) {
      return 'warning'; // red
    } else if (percentage < 75) {
      return 'success'; // yellow
    } else {
      return 'danger'; // green
    }
  }
  getStateColor(status: number) {
    if ([0].includes(status)) return "secondary"
    if ([1, 2, 3, 5, 6, 7].includes(status)) return "warning"
    if ([8, 9].includes(status)) return "success"
    if ([13, 14].includes(status)) return "danger"
    else return "info"
  }

  color() {

    if (this.unit.realbooleans[1]) {
      return "warning"
    }
    if (this.unit.realbooleans[2]) {
      return "danger"
    }
    else {
      return ''
    }
  }

  getError() {
    let divs = ""

  }
}

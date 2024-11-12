import { Component, inject } from '@angular/core';
import { UnitService } from '../../service/unit.service';
import { Historic } from '../../models/unit';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import moment from 'moment'; // For handling dates
import { ChartData, ChartOptions } from 'chart.js';
import 'chartjs-adapter-moment';
import 'chartjs-plugin-zoom';
import { Generic } from '../../models/generic';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrl: './historic.component.scss',
  providers: [DatePipe]
})
export class HistoricComponent {
  private route = inject(ActivatedRoute);
  charOptions: ChartOptions = {
    responsive: true,
    plugins: {
      zoom: {
        pan: {
          enabled: true, // Enable panning
          mode: 'xy', // Allow panning in both x and y directions
        },
        zoom: {
          pinch: { enabled: true },
          wheel: { enabled: true },
          mode: "xy"
        }
      }
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: 'hour',
          displayFormats: { hour: 'DD MMM HH:mm' },
          tooltipFormat: 'DD MMM HH:mm'
        },
      },
      y: {}
    }
  }
  

  chartData: ChartData<'scatter'> = {
    datasets: [
      { label: "Voltage UC", data: [] },
      { label: "Voltage VC", data: [] },
      { label: "Voltage WC", data: [] }
    ]
  }

  chartData2: ChartData<'scatter'> = {
    datasets: [
      { label: "Voltage UC", data: [] },
      { label: "Voltage VC", data: [] },
      { label: "Voltage WC", data: [] }
    ]
  }

  chartData3: ChartData<'scatter'> = {
    datasets: [
      { label: "Main HZ", data: [] },
      { label: "Gen HZ", data: [] }
    ]
  }

  chartData4: ChartData<'scatter'> = {
    datasets: [
      { label: "Corriente U", data: [] },
      { label: "Corriente V", data: [] },
      { label: "Corriente W", data: [] }

    ]
  }



  chartData5: ChartData<'scatter'> = {
    datasets: [
      { label: "Paquete", data: [] }

    ]
  }

  chartData6: ChartData<'scatter'> = {
    datasets: [
      { label: "Voltaje V", data: [] },
      { label: "Nivel de Combustible", data: []},
      { label: "Presion de aceite", data: [] },
      { label: "Temperatura C", data: [] }

    ]
  }

  historic: Historic[] = [];
  loaded = false;
  today = new Date();
  date = new Date();
  maxDate = new Date(this.date.setDate(this.date.getDate() - 90));

  constructor(private unitService: UnitService, private toast: ToastrService, private datePipe: DatePipe) {
    const formattedDate = this.datePipe.transform(this.today, 'dd-MM-yyyy')
    this.getHistoric(formattedDate!.toString()); // Fetch historical data
  }

  check (value: any) {
    const formattedDate = this.datePipe.transform(value, 'dd-MM-yyyy');
    this.loaded = false
    this.getHistoric(formattedDate!.toString())
  }

  // Fetch historic data
  getHistoric(date: string) {
    this.unitService.getHistoric(this.route.snapshot.paramMap.get('unitid')!, date).subscribe({
      next: (response: Generic) => this.processHistoricData(response),
      error: () => this.toast.error("Error obteniendo historial")
    });
  }
  
  processHistoricData(response: Generic) {
    if (response.error) {
      this.toast.error("Error obteniendo datos");
      return;
    }
  
    const historicData: Historic[] = response.data;
    historicData.forEach(data => this.updateChart(data));
    this.loaded = true;
  }

  parseChunk(chunk: string): Historic[] {
    try {
      const parsedChunk = JSON.parse(chunk);
      return parsedChunk.data || [];
    } catch (e) {
      console.error('Error parsing chunk:', e);
      return [];
    }
  }

  updateChart(data: Historic) {
    const timestamp = moment(data.createdAt).valueOf();
    this.chartData5.datasets[0].data.push({ x: timestamp, y: data.packetNum });

    this.chartData.datasets[0].data.push({ x: timestamp, y: data.realvalues[0] });
    this.chartData.datasets[1].data.push({ x: timestamp, y: data.realvalues[1] });
    this.chartData.datasets[2].data.push({ x: timestamp, y: data.realvalues[2] });

    this.chartData3.datasets[0].data.push({ x: timestamp, y: data.realvalues[6] / 10});
    this.chartData3.datasets[1].data.push({ x: timestamp, y: data.realvalues[13] /10 });

    this.chartData2.datasets[0].data.push({ x: timestamp, y: data.realvalues[7] });
    this.chartData2.datasets[1].data.push({ x: timestamp, y: data.realvalues[8] });
    this.chartData2.datasets[2].data.push({ x: timestamp, y: data.realvalues[9] });

    this.chartData4.datasets[0].data.push({ x: timestamp, y: data.realvalues[14] });
    this.chartData4.datasets[1].data.push({ x: timestamp, y: data.realvalues[15] });
    this.chartData4.datasets[2].data.push({ x: timestamp, y: data.realvalues[16] });

    this.chartData6.datasets[0].data.push({ x: timestamp, y: data.realvalues[24]/10 });
    this.chartData6.datasets[1].data.push({ x: timestamp, y: data.realvalues[21]/10 });
    this.chartData6.datasets[2].data.push({ x: timestamp, y: data.realvalues[19] });
    this.chartData6.datasets[3].data.push({ x: timestamp, y: data.realvalues[17] });
  }
}

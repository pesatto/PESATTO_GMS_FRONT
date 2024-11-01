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

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrl: './historic.component.scss'
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

  historic: Historic[] = [];
  loaded = false;

  constructor(private unitService: UnitService, private toast: ToastrService) {
    this.getHistoric(); // Fetch historical data
  }

  // Fetch historic data
  getHistoric() {
    this.unitService.getHistoric(this.route.snapshot.paramMap.get('unitid')!).subscribe({
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
  }
}
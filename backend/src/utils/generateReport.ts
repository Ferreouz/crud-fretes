import db from "../db";
import { IFreightWithVehicle } from "../db/freights/types";
import Excel from 'exceljs';
import { formatMoney } from "./utils";
export async function generateReport() {
    const all = await db.freights.getAllFreightsWithVehicleDeliveredYesterday();
    await exportReport(all);
}

async function exportReport(freights: IFreightWithVehicle[]) {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Countries List');

    worksheet.columns = [
        { key: 'product_name', header: 'Nome do produto' },
        { key: 'distanceKm', header: 'Distancia (KM)' },
        { key: 'price', header: 'Preço Total' },
        { key: 'rate', header: 'Taxa' },
        { key: 'driver_receives', header: 'Comissão Motorista' },
        { key: 'delivered_at', header: 'Finalizado em' },
        { key: 'vehicle_name', header: 'Nome do veiculo' },
        { key: 'vehicle_plate', header: 'Placa do veiculo' },
        { key: 'vehicle_type', header: 'Tipo do veiculo' },
        { key: 'driver_name', header: 'Nome do motorista' },
        { key: 'driver_email', header: 'Email do motorista' },
    ];

    freights.forEach((item) => {
        worksheet.addRow({
            product_name: item.product_name,
            distanceKm: item.distance,
            price: formatMoney(item.price),
            rate: formatMoney(item.rate),
            driver_receives: formatMoney((item.price as number) - (item.rate as number)),
            delivered_at: new Date(item.delivered_at).toLocaleString('pt-BR'),
            vehicle_name: item.vehicle.name,
            vehicle_plate: item.vehicle.plate,
            vehicle_type: item.vehicle.type,
            driver_name: item.driver.name,
            driver_email: item.driver.email,
        });
    });

    await workbook.xlsx.writeFile("./reports/relatorio.xlsx");
};
// src/trips/trips.service.ts

import { Injectable, Inject } from '@nestjs/common';
import { Database } from 'better-sqlite3';
import { TripStatsResponseDto } from './dto/trip-stats-response.dto';

@Injectable()
export class TripsService {
  constructor(@Inject('DATABASE_CONNECTION') private db: Database) { }

  getTripStats(tripId: string): TripStatsResponseDto {
    // --- 1. Query: Gastos por Categoria ---
    const categoryQuery = `
      SELECT 
        c.name as categoryName, 
        c.color as color, 
        SUM(e.amount) as total
      FROM expenses e
      LEFT JOIN categories c ON e.category_id = c.id
      WHERE e.trip_id = ?
      GROUP BY c.id
      ORDER BY total DESC
    `;

    // O better-sqlite3 retorna um array de objetos simples
    const rawCategories = this.db.prepare(categoryQuery).all(tripId) as { categoryName: string; color: string; total: number }[];


    // --- 2. Query: Gastos por Dia ---
    // Usamos substr para pegar apenas a parte da data (YYYY-MM-DD) se estiver salvo como ISO string
    const dayQuery = `
      SELECT 
        substr(e.date, 1, 10) as date, 
        SUM(e.amount) as total
      FROM expenses e
      WHERE e.trip_id = ?
      GROUP BY substr(e.date, 1, 10)
      ORDER BY date ASC
    `;

    const rawDays = this.db.prepare(dayQuery).all(tripId) as { date: string; total: number }[];


    // --- 3. Query: Gastos por Membro ---
    const memberQuery = `
      SELECT 
        u.name as memberName, 
        SUM(e.amount) as total
      FROM expenses e
      LEFT JOIN users u ON e.paid_by_id = u.id
      WHERE e.trip_id = ?
      GROUP BY u.id
      ORDER BY total DESC
    `;

    const rawMembers = this.db.prepare(memberQuery).all(tripId) as { memberName: string; total: number }[];


    // --- 4. Processamento Final (Regra de Negócio) ---

    // Calcular o total geral para fazer a porcentagem
    const tripTotal = rawMembers.reduce((acc, curr) => acc + curr.total, 0);

    // Mapear para o DTO final adicionando a porcentagem
    const byMemberMapped = rawMembers.map(m => ({
      memberName: m.memberName || 'Desconhecido',
      total: m.total,
      percentage: tripTotal > 0 ? Number(((m.total / tripTotal) * 100).toFixed(2)) : 0
    }));

    // Retorno estrito conforme o DTO
    return {
      byCategory: rawCategories.map(c => ({
        categoryName: c.categoryName || 'Outros',
        color: c.color || '#cbd5e1', // Cor default (slate-300) se for null
        total: c.total
      })),
      byDay: rawDays,
      byMember: byMemberMapped
    };
  }
}
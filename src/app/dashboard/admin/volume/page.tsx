"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Plus } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";

// Mock data type
interface Volume {
  id: string;
  volume: string;
  satuan: string;
}

export default function VolumePage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const columns: ColumnDef<Volume>[] = [
    {
      accessorKey: "volume",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Volume
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="relative max-w-[200px] truncate">
            <span>{row.original.volume || "-"}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "satuan",
      header: "Satuan",
      cell: ({ row }) => {
        return (
          <div className="relative max-w-[150px] truncate">
            <span>{row.original.satuan || "-"}</span>
          </div>
        );
      },
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set("search", e.target.value);
    router.push(`?${params.toString()}`);
  };

  const handleResetFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.set("search", "");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-screen-2xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Volume</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Kelola data volume dan satuan
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <Input onChange={handleSearch} placeholder="Cari volume..." />
          <Button
            variant="outline"
            onClick={() => router.push(`${pathname}/create`)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Buat Baru
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={[]}
        isLoading={false}
        totalItems={0}
        noDataMessage="Tidak ada data volume tersedia"
        noFilteredDataMessage="Tidak ada volume yang sesuai dengan filter"
        filterActive={searchParams.get("search") !== ""}
        onResetFilter={handleResetFilter}
        tableName="volume"
      />
    </div>
  );
}

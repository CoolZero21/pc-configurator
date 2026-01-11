export const compMap = {
  mobo: {
    configKey: "mobo",
    dataKey: "mobos",
    specs: (mobo) => ({
      "Socket": mobo?.socket,
      "Chipset": mobo?.chipset,
      "Memory Type": mobo?.memoryType,
      "Memory Slots": mobo?.memorySlots,
      "Form Factor": mobo?.formFactor,
      "WIFI": mobo?.wifi,
    }),
    name: (mobo) => mobo.name,
    filters: {
      checkbox: [
        {
          "Socket": {
            key: "socket",
            values: (cpus) =>
              [...new Set(cpus.map((cpu) => cpu.socket))].sort(
                (a, b) => Number(a.match(/[0-9]+/)) - Number(b.match(/[0-9]+/))
              ),
          },
        },
        {
          "Chipset": {
            key: "chipset",
            values: (cpus) => [...new Set(cpus.map((cpu) => cpu.chipset))].sort(),
          },
        },
        {
          "Memory Type": {
            key: "memoryType",
            values: (cpus) => [...new Set(cpus.map((cpu) => cpu.memoryType))],
          },
        },
        {
          "Memory Slots": {
            key: "memorySlots",
            values: (cpus) =>
              [...new Set(cpus.map((cpu) => cpu.memorySlots))].sort(
                (a, b) => Number(a.match(/[0-9]+/)) - Number(b.match(/[0-9]+/))
              ),
          },
        },
        {
          "WIFI": {
            key: "wifi",
            values: (cpus) => [...new Set(cpus.map((cpu) => cpu.wifi))],
          },
        },
      ],
    },
    dependencies: {
      cpu: (mobo, cpu) => [
        mobo?.socket === cpu?.socket ? true : "Motherboard and CPU socket must match",
      ],
      ram: (mobo, ram) => [
        mobo?.memoryType === ram?.ramType ? true : "Motherboard doesn`t support this Memory type",

        mobo?.memorySlots >= ram?.amountOfModules
          ? true
          : `Motherboard support only ${mobo?.memorySlots} modules of Memory`,
      ],
    },
    comparision: (mobo1, mobo2) => {
      if (!mobo1 || !mobo2) return null;

      return {
        "Socket": null,
        "Chipset": null,
        "Memory Type":
          mobo1.memoryType === mobo2.memoryType
            ? null
            : Number(mobo1.memoryType.match(/\d/)) > Number(mobo2.memoryType.match(/\d/))
            ? mobo1.memoryType
            : mobo2.memoryType,
        "Memory Slots":
          mobo1.memorySlots === mobo2.memorySlots
            ? null
            : mobo1.memorySlots > mobo2.memorySlots
            ? mobo1.memorySlots
            : mobo2.memorySlots,
        "Form Factor": null,
        "WIFI": mobo1.wifi === mobo2.wifi ? null : mobo1.wifi === "Yes" ? mobo1.wifi : mobo2.wifi,
      };
    },
  },

  cpu: {
    configKey: "cpu",
    dataKey: "cpus",
    specs: (cpu) => ({
      "Socket": cpu?.socket,
      "Frequency": cpu?.frequency,
      "Turbo Clock": cpu?.turboClock,
      "Cores": cpu?.numOfCores,
      "Threads": cpu?.numOfThreads,
      "Process Size": cpu?.processSize,
      "Memory Support": cpu?.memorySupp,
      "Integrated Graphics": cpu?.integratedGraphics,
    }),
    name: (cpu) => cpu.name,
    filters: {
      checkbox: [
        {
          "Number Of Cores": {
            key: "numOfCores",
            values: (cpus) =>
              [...new Set(cpus.map((cpu) => cpu.numOfCores))].sort(
                (a, b) => Number(a.match(/[0-9]+/)) - Number(b.match(/[0-9]+/))
              ),
          },
        },
        {
          "Number Of Threads": {
            key: "numOfThreads",
            values: (cpus) =>
              [...new Set(cpus.map((cpu) => cpu.numOfThreads))].sort(
                (a, b) => Number(a.match(/[0-9]+/)) - Number(b.match(/[0-9]+/))
              ),
          },
        },
        {
          "Socket": {
            key: "socket",
            values: (cpus) =>
              [...new Set(cpus.map((cpu) => cpu.socket))].sort(
                (a, b) => Number(a.match(/[0-9]+/)) - Number(b.match(/[0-9]+/))
              ),
          },
        },
      ],
    },
    dependencies: {
      ram: (cpu, ram) => [
        cpu?.memorySupp === ram?.ramType ? true : `CPU doesn't support this Memory type`,
      ],
    },
    comparision: (cpu1, cpu2) => {
      if (!cpu1 || !cpu2) return null;

      return {
        "Socket": null,
        "Frequency":
          cpu1.frequency === cpu2.frequency
            ? null
            : Number(cpu1.frequency.match(/\d(.\d+)?/)[0]) >
              Number(cpu2.frequency.match(/\d(.\d+)?/)[0])
            ? cpu1.frequency
            : cpu2.frequency,
        "Turbo Clock":
          cpu1.turboClock === cpu2.turboClock
            ? null
            : Number(cpu1.turboClock.match(/\d(.\d+)?/)[0]) >
              Number(cpu2.turboClock.match(/\d(.\d+)?/)[0])
            ? cpu1.turboClock
            : cpu2.turboClock,
        "Cores":
          cpu1.numOfCores === cpu2.numOfCores
            ? null
            : Number(cpu1.numOfCores) > Number(cpu2.numOfCores)
            ? cpu1.numOfCores
            : cpu2.numOfCores,
        "Threads":
          cpu1.numOfThreads === cpu2.numOfThreads
            ? null
            : Number(cpu1.numOfThreads) > Number(cpu2.numOfThreads)
            ? cpu1.numOfThreads
            : cpu2.numOfThreads,
        "Process Size":
          cpu1.processSize === cpu2.processSize
            ? null
            : Number(cpu1.processSize.match(/\d+/)) < Number(cpu2.processSize.match(/\d+/))
            ? cpu1.processSize
            : cpu2.processSize,
        "Memory Support": null,
        "Integrated Graphics": null,
      };
    },
  },

  ram: {
    configKey: "ram",
    dataKey: "rams",
    specs: (ram) => ({
      "Clock": ram?.clock,
      "Memory Type": ram?.ramType,
      "Size": ram?.size?.match(/\d+/g) + " GB",
      "Timings": ram?.timings === "N/A" ? "—" : ram?.timings,
    }),
    name: (ram) => ram.name,
    filters: {
      checkbox: [
        {
          "Memory Type": {
            key: "ramType",
            values: (rams) => [...new Set(rams.map((ram) => ram.ramType))],
          },
        },
        {
          "Timings": {
            key: "timings",
            values: (rams) =>
              [...new Set(rams.map((ram) => ram.timings))].sort(
                (a, b) => Number(b.match(/[0-9]+/)) - Number(a.match(/[0-9]+/))
              ),
          },
        },
        {
          "Size": {
            key: "size",
            values: (rams) =>
              [...new Set(rams.map((ram) => ram.size))].sort(
                (a, b) => Number(b.match(/[0-9]+/)) - Number(a.match(/[0-9]+/))
              ),
          },
        },
        {
          "Clock": {
            key: "clock",
            values: (rams) =>
              [...new Set(rams.map((ram) => ram.clock))].sort(
                (a, b) => Number(b.match(/[0-9]+/)) - Number(a.match(/[0-9]+/))
              ),
          },
        },
      ],
    },
    dependencies: {},
    comparision: (ram1, ram2) => {
      if (!ram1 || !ram2) return null;

      return {
        "Clock":
          ram1.clock === ram2.clock
            ? null
            : Number(ram1.clock.match(/\d+/)) > Number(ram2.clock.match(/\d+/))
            ? ram1.clock
            : ram2.clock,
        "Memory Type": null,
        "Size":
          ram1.size === ram2.size
            ? null
            : Number(ram1.size.match(/\d+/)) > Number(ram2.size.match(/\d+/))
            ? ram1.size
            : ram2.size,
        "Timings":
          ram1.timings === ram2.timings || ram1.timings === "N/A" || ram2.timings === "N/A"
            ? null
            : Number(ram1.timings.match(/\d+/)[0]) < Number(ram2.timings.match(/\d+/)[0])
            ? ram1.timings
            : ram2.timings,
      };
    },
  },

  gpu: {
    configKey: "gpu",
    dataKey: "gpus",
    specs: (gpu) => ({
      "Memory Size": gpu?.memorySize,
      "Memory Type": gpu?.memoryType,
      "Memory Clock": gpu?.memoryClock,
      "Bus Interface": gpu?.busInterface,
      "Base Clock": gpu?.baseClock,
      "Boost Clock": gpu?.boostClock,
      "TDP": gpu?.TDP,
      "Suggested PSU": gpu?.suggestedPSU,
    }),
    name: (gpu) => gpu.name,
    filters: {
      checkbox: [
        {
          "Memory Type": {
            key: "memoryType",
            values: (gpus) =>
              [...new Set(gpus.map((gpu) => gpu.memoryType))].sort(
                (a, b) => Number(b.match(/[0-9]/)) - Number(a.match(/[0-9]/))
              ),
          },
        },
        {
          "Memory Size": {
            key: "memorySize",
            values: (gpus) =>
              [...new Set(gpus.map((gpu) => gpu.memorySize))].sort(
                (a, b) => Number(a.match(/[0-9]+/)) - Number(b.match(/[0-9]+/))
              ),
          },
        },
        {
          "Bus Interface": {
            key: "busInterface",
            values: (gpus) =>
              [...new Set(gpus.map((gpu) => gpu.busInterface))].sort(
                (a, b) => Number(b.match(/[0-9]+/)) - Number(a.match(/[0-9]+/))
              ),
          },
        },
      ],
    },
    dependencies: {
      psu: (gpu, psu) => [
        psu?.watt >= gpu?.suggestedPSU.match(/\d+/g) * 0.9 ? true : "PSU is too weak for this GPU",
      ],
    },
    comparision: (gpu1, gpu2) => {
      if (!gpu1 || !gpu2) return null;

      return {
        "Memory Size":
          gpu1.memorySize === gpu2.memorySize
            ? null
            : Number(gpu1.memorySize.match(/\d+/)) > Number(gpu2.memorySize.match(/\d+/))
            ? gpu1.memorySize
            : gpu2.memorySize,
        "Memory Type": null,
        "Memory Clock":
          gpu1.memoryClock === gpu2.memoryClock
            ? null
            : Number(gpu1.memoryClock.match(/\d+/)) > Number(gpu2.memoryClock.match(/\d+/))
            ? gpu1.memoryClock
            : gpu2.memoryClock,
        "Bus Interface":
          gpu1.busInterface.match(/\d/)[0] === gpu2.busInterface.match(/\d/)[0]
            ? null
            : Number(gpu1.busInterface.match(/\d/)[0]) > Number(gpu2.busInterface.match(/\d/)[0])
            ? gpu1.busInterface
            : gpu2.busInterface,
        "Base Clock":
          gpu1.baseClock === gpu2.baseClock
            ? null
            : Number(gpu1.baseClock.match(/\d+/)) > Number(gpu2.baseClock.match(/\d+/))
            ? gpu1.baseClock
            : gpu2.baseClock,
        "Boost Clock":
          gpu1.boostClock === gpu2.boostClock
            ? null
            : Number(gpu1.boostClock.match(/\d+/)) > Number(gpu2.boostClock.match(/\d+/))
            ? gpu1.boostClock
            : gpu2.boostClock,
        "TDP":
          gpu1.TDP === gpu2.TDP
            ? null
            : Number(gpu1.TDP.match(/\d+/)) < Number(gpu2.TDP.match(/\d+/))
            ? gpu1.TDP
            : gpu2.TDP,
        "Suggested PSU": null,
      };
    },
  },

  psu: {
    configKey: "psu",
    dataKey: "psus",
    specs: (psu) => ({
      "Size": psu?.size,
      "Watt": psu?.watt,
      "Efficiency Rating": psu?.efficiencyRating,
    }),
    name: (psu) => psu.name,
    filters: {
      checkbox: [
        {
          "Size": {
            key: "size",
            values: (psus) => [...new Set(psus.map((psu) => psu.size))],
          },
        },
        {
          "Certification": {
            key: "efficiencyRating",
            values: (psus) => [...new Set(psus.map((psu) => psu.efficiencyRating))],
          },
        },
        {
          "Watt": {
            key: "watt",
            values: (psus) => [...new Set(psus.map((psu) => psu.watt))].sort((a, b) => a - b),
          },
        },
      ],
    },
    dependencies: {},
    comparision: (psu1, psu2) => {
      if (!psu1 || !psu2) return null;
      const efficiencyRatingEscalation = (rating) => {
        const map = {
          "N/A": 1,
          "80 PLUS": 2,
          "80 PLUS White": 2,
          "80 PLUS Bronze": 3,
          "80 PLUS Silver": 4,
          "80 PLUS Gold": 5,
          "80 PLUS Platinum": 6,
          "80 PLUS Titanium": 7,
        };

        return map[rating];
      };

      return {
        "Size": null,
        "Watt":
          psu1.watt === psu2.watt
            ? null
            : Number(psu1.watt.match(/\d+/)) > Number(psu2.watt.match(/\d+/))
            ? psu1.watt
            : psu2.watt,
        "Efficiency Rating":
          efficiencyRatingEscalation(psu1.efficiencyRating) ===
          efficiencyRatingEscalation(psu2.efficiencyRating)
            ? null
            : efficiencyRatingEscalation(psu1.efficiencyRating) >
              efficiencyRatingEscalation(psu2.efficiencyRating)
            ? psu1.efficiencyRating
            : psu2.efficiencyRating,
      };
    },
  },
};

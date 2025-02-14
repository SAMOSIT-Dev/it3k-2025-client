import { JSX } from 'react'

export type UniversityTeamName = 'KMUTT' | 'KMITL' | 'KMUTNB' | 'KMUTNB PR'
export type Sport =
  | 'แบดบินตัน'
  | 'ฟุตบอล'
  | 'กีฬาพื้นบ้าน'
  | 'บาสเกตบอล'
  | 'ปิงปอง'
  | 'ชักเย่อ'
  | 'กินวิบาก'
  | 'วิ่งเปรี้ยว'

export interface ScheduleData {
  sportTitle: string
  icon?: string | JSX.Element
  arena?: string
  homeTeam?: {
    name: string
    logo?: string
  }
  awayTeam?: {
    name: string
    logo?: string
  }
  preiod: {
    start: string
    end: string
  }
}

export interface MixedScheduleData {
  title: string
  scheduleData: ScheduleData[]
}

const iconList: { [key: string]: JSX.Element } = {
  badminton: (
    <svg
      width="34"
      height="33"
      viewBox="0 0 34 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M32.7703 14.6656L27.8342 13.6076L13.2785 24.3179L11.7891 22.8919L26.7166 11.9095L26.2696 8.13539C26.2152 7.67137 25.833 7.30536 25.3504 7.25536L21.1371 6.79735L9.9195 21.1038L8.4301 19.6758L19.7646 5.21729L19.2842 1.13516C19.2549 0.861146 19.1024 0.611138 18.8727 0.447132C18.6429 0.283127 18.3504 0.215124 18.0663 0.263126L12.1588 1.26316C11.7807 1.32716 11.4716 1.58117 11.3483 1.92918L5.51813 18.6357L3.78223 20.2978L12.6435 28.7821L14.3773 27.122L31.8261 21.5398C32.1812 21.4258 32.4465 21.1398 32.5196 20.7878L33.5641 15.8396C33.679 15.3076 33.326 14.7856 32.7703 14.6656Z"
        fill="white"
      />
      <path
        d="M2.3054 21.7129L2.00042 22.0049C-0.441545 24.345 -0.441545 28.1491 2.00042 30.4892C3.18275 31.6232 4.7578 32.2472 6.43104 32.2472C8.10427 32.2472 9.67932 31.6212 10.8617 30.4892L11.1666 30.1972L2.3054 21.7129Z"
        fill="white"
      />
    </svg>
  )
}

export const scheduleData: ScheduleData[] = [
  {
    sportTitle: 'แบดบินตัน',
    icon: iconList.badminton,
    homeTeam: {
      name: 'KMUTT',
      logo: '/images/KMUTT_logo.png'
    },
    awayTeam: {
      name: 'KMITL',
      logo: '/images/KMITL_logo.png'
    },
    preiod: {
      start: '13:00',
      end: '16:00'
    }
  },
  {
    sportTitle: 'แบดบินตัน',
    icon: iconList.badminton,
    homeTeam: {
      name: 'KMUTT',
      logo: '/images/KMUTT_logo.png'
    },
    awayTeam: {
      name: 'KMITL',
      logo: '/images/KMITL_logo.png'
    },
    preiod: {
      start: '13:00',
      end: '16:00'
    }
  }
]

export const traditionGameScheduleData: ScheduleData[] = [
  {
    sportTitle: 'ชักเย่อ',
    homeTeam: {
      name: 'KMUTT',
      logo: '/images/KMUTT_logo.png'
    },
    awayTeam: {
      name: 'KMUTNB',
      logo: '/images/KMUTNB_logo.png'
    },
    preiod: {
      start: '15:00',
      end: '15:15'
    }
  },
  {
    sportTitle: 'ชักเย่อ',
    homeTeam: {
      name: 'KMITL',
      logo: '/images/KMITL_logo.png'
    },
    awayTeam: {
      name: 'KMUTNB PR',
      logo: '/images/KMUTNB_logo.png'
    },
    preiod: {
      start: '15:00',
      end: '15:15'
    }
  },
  {
    sportTitle: 'ชักเย่อชิงชนะเลิศอันดับ 3',
    homeTeam: {
      name: 'แพ้คู่ 1'
    },
    awayTeam: {
      name: 'แพ้คู่ 2'
    },
    preiod: {
      start: '15:00',
      end: '15:15'
    }
  },
  {
    sportTitle: 'ชักเย่อชิงชนะเลิศอันดับ 1',
    homeTeam: {
      name: 'ชนะคู่ 1'
    },
    awayTeam: {
      name: 'ชนะคู่ 2'
    },
    preiod: {
      start: '15:00',
      end: '15:15'
    }
  },
  {
    sportTitle: 'กินวิบาก',
    preiod: {
      start: '15:20',
      end: '15:35'
    }
  },
  {
    sportTitle: 'วิ่งเปรี้ยว',
    homeTeam: {
      name: 'KMUTT',
      logo: '/images/KMUTT_logo.png'
    },
    awayTeam: {
      name: 'KMUTNB',
      logo: '/images/KMUTNB_logo.png'
    },
    preiod: {
      start: '15:00',
      end: '15:15'
    }
  },
  {
    sportTitle: 'วิ่งเปรี้ยว',
    homeTeam: {
      name: 'KMITL',
      logo: '/images/KMITL_logo.png'
    },
    awayTeam: {
      name: 'KMUTNB PR',
      logo: '/images/KMUTNB_logo.png'
    },
    preiod: {
      start: '15:00',
      end: '15:15'
    }
  },
  {
    sportTitle: 'ชักเย่อชิงชนะเลิศอันดับ 3',
    homeTeam: {
      name: 'แพ้คู่ 1'
    },
    awayTeam: {
      name: 'แพ้คู่ 2'
    },
    preiod: {
      start: '15:00',
      end: '15:15'
    }
  },
  {
    sportTitle: 'ชักเย่อชิงชนะเลิศอันดับ 1',
    homeTeam: {
      name: 'ชนะคู่ 1'
    },
    awayTeam: {
      name: 'ชนะคู่ 2'
    },
    preiod: {
      start: '15:00',
      end: '15:15'
    }
  }
]

export const basketballScheduleData: ScheduleData[] = [
  {
    sportTitle: 'บาสเกตบอล',
    homeTeam: {
      name: 'KMUTT',
      logo: '/images/KMUTT_logo.png'
    },
    awayTeam: {
      name: 'KMUTNB',
      logo: '/images/KMUTNB_logo.png'
    },
    preiod: {
      start: '09:00',
      end: '10:10'
    }
  },
  {
    sportTitle: 'บาสเกตบอล',
    homeTeam: {
      name: 'KMUTNB PR',
      logo: '/images/KMUTNB_logo.png'
    },
    awayTeam: {
      name: 'KMITL',
      logo: '/images/KMITL_logo.png'
    },
    preiod: {
      start: '09:35',
      end: '10:00'
    }
  },
  {
    sportTitle: 'บาสเกตบอล',
    homeTeam: {
      name: 'KMUTT',
      logo: '/images/KMUTT_logo.png'
    },
    awayTeam: {
      name: 'KMITL',
      logo: '/images/KMITL_logo.png'
    },
    preiod: {
      start: '10:10',
      end: '10:35'
    }
  },
  {
    sportTitle: 'บาสเกตบอล',
    homeTeam: {
      name: 'KMUTNB',
      logo: '/images/KMUTNB_logo.png'
    },
    awayTeam: {
      name: 'KMUTNB PR',
      logo: '/images/KMUTNB_logo.png'
    },
    preiod: {
      start: '10:45',
      end: '11:10'
    }
  },
  {
    sportTitle: 'บาสเกตบอล',
    homeTeam: {
      name: 'KMUTT',
      logo: '/images/KMUTT_logo.png'
    },
    awayTeam: {
      name: 'KMUTNB PR',
      logo: '/images/KMUTNB_logo.png'
    },
    preiod: {
      start: '11:20',
      end: '11:45'
    }
  },
  {
    sportTitle: 'บาสเกตบอล',
    homeTeam: {
      name: 'KMUTNB',
      logo: '/images/KMUTNB_logo.png'
    },
    awayTeam: {
      name: 'KMITL',
      logo: '/images/KMITL_logo.png'
    },
    preiod: {
      start: '11:55',
      end: '12:20'
    }
  }
]

export const footballScheduleData: ScheduleData[] = [
  {
    sportTitle: 'ฟุตบอล',
    homeTeam: {
      name: 'KMUTT',
      logo: '/images/KMUTT_logo.png'
    },
    awayTeam: {
      name: 'KMUTNB RP',
      logo: '/images/KMUTNB_logo.png'
    },
    preiod: {
      start: '09:00',
      end: '10:10'
    }
  },
  {
    sportTitle: 'ฟุตบอล',
    homeTeam: {
      name: 'KMUTNB PR',
      logo: '/images/KMUTNB_logo.png'
    },
    awayTeam: {
      name: 'KMITL',
      logo: '/images/KMITL_logo.png'
    },
    preiod: {
      start: '10:15',
      end: '11:25'
    }
  },
  {
    sportTitle: 'ฟุตบอล',
    homeTeam: {
      name: 'KMUTT',
      logo: '/images/KMUTT_logo.png'
    },
    awayTeam: {
      name: 'KMITL',
      logo: '/images/KMITL_logo.png'
    },
    preiod: {
      start: '11:30',
      end: '12:40'
    }
  },
  {
    sportTitle: 'ฟุตบอลรอบชิง',
    homeTeam: {
      name: ''
      // logo: '/images/KMUTT_logo.png'
    },
    awayTeam: {
      name: ''
      // logo: '/images/KMUTNB_logo.png'
    },
    preiod: {
      start: '16:15',
      end: '18:00'
    }
  }
]

export const badmintonScheduleData: MixedScheduleData[] = [
  {
    title: 'คู่ผสม',
    scheduleData: [
      {
        sportTitle: 'แบดมินตัน (คู่ผสม)',
        arena: 'สนาม: 1',
        homeTeam: {
          name: 'KMUTT',
          logo: '/images/KMUTT_logo.png'
        },
        awayTeam: {
          name: 'KMITL',
          logo: '/images/KMITL_logo.png'
        },
        preiod: {
          start: '09:40',
          end: '10:25'
        }
      },
      {
        sportTitle: 'แบดมินตัน (คู่ผสม)',
        arena: 'สนาม: 2',
        homeTeam: {
          name: 'KMUTNB BKK',
          logo: '/images/KMUTNB_logo.png'
        },
        awayTeam: {
          name: 'KMUTNB PR',
          logo: '/images/KMUTNB_logo.png'
        },
        preiod: {
          start: '10:20',
          end: '10:55'
        }
      },
      {
        sportTitle: 'แบดมินตัน (คู่ผสม)',
        arena: 'สนาม: 4',
        homeTeam: {
          name: 'KMUTT',
          logo: '/images/KMUTT_logo.png'
        },
        awayTeam: {
          name: 'KMITL',
          logo: '/images/KMITL_logo.png'
        },
        preiod: {
          start: '11:00',
          end: '11:35'
        }
      },
      {
        sportTitle: 'แบดมินตัน (คู่ผสม)',
        arena: 'สนาม: 3',
        homeTeam: {
          name: 'KMUTNB BKK',
          logo: '/images/KMUTNB_logo.png'
        },
        awayTeam: {
          name: 'KMUTT',
          logo: '/images/KMUTT_logo.png'
        },
        preiod: {
          start: '11:40',
          end: '11:35'
        }
      },
      {
        sportTitle: 'แบดมินตัน (คู่ผสม)',
        arena: 'สนาม: 2',
        homeTeam: {
          name: 'KMUTNB PR',
          logo: '/images/KMUTNB_logo.png'
        },
        awayTeam: {
          name: 'KMITL',
          logo: '/images/KMITL_logo.png'
        },
        preiod: {
          start: '11:40',
          end: '11:35'
        }
      }
    ]
  },
  {
    title: 'ชายคู่',
    scheduleData: [
      {
        sportTitle: 'แบดมินตัน (ชายคู่)',
        arena: 'สนาม: 3',
        homeTeam: {
          name: 'KMITL',
          logo: '/images/KMITL_logo.png'
        },
        awayTeam: {
          name: 'KMUTNB PR',
          logo: '/images/KMUTNB_logo.png'
        },
        preiod: {
          start: '09:00',
          end: '09:35'
        }
      },
      {
        sportTitle: 'แบดมินตัน (ชายคู่)',
        arena: 'สนาม: 4',
        homeTeam: {
          name: 'KMUTNB BKK',
          logo: '/images/KMUTNB_logo.png'
        },
        awayTeam: {
          name: 'KMUTT',
          logo: '/images/KMUTT_logo.png'
        },
        preiod: {
          start: '09:40',
          end: '10:25'
        }
      },
      {
        sportTitle: 'แบดมินตัน (ชายคู่)',
        arena: 'สนาม: 1',
        homeTeam: {
          name: 'KMUTT',
          logo: '/images/KMUTT_logo.png'
        },
        awayTeam: {
          name: 'KMITL',
          logo: '/images/KMITL_logo.png'
        },
        preiod: {
          start: '11:00',
          end: '11:15'
        }
      },
      {
        sportTitle: 'แบดมินตัน (ชายคู่)',
        arena: 'สนาม: 4',
        homeTeam: {
          name: 'KMUTNB BKK',
          logo: '/images/KMUTNB_logo.png'
        },
        awayTeam: {
          name: 'KMUTNB PR',
          logo: '/images/KMUTNB_logo.png'
        },
        preiod: {
          start: '11:40',
          end: '12:15'
        }
      }
    ]
  },
  {
    title: 'ชายเดี่ยว',
    scheduleData: [
      {
        sportTitle: 'แบดมินตัน (ชายเดี่ยว)',
        arena: 'สนาม: 3',
        homeTeam: {
          name: 'KMITL',
          logo: '/images/KMITL_logo.png'
        },
        awayTeam: {
          name: 'KMUTNB PR',
          logo: '/images/KMUTNB_logo.png'
        },
        preiod: {
          start: '09:00',
          end: '09:35'
        }
      },
      {
        sportTitle: 'แบดมินตัน (ชายเดี่ยว)',
        arena: 'สนาม: 4',
        homeTeam: {
          name: 'KMUTNB BKK',
          logo: '/images/KMUTNB_logo.png'
        },
        awayTeam: {
          name: 'KMUTT',
          logo: '/images/KMUTT_logo.png'
        },
        preiod: {
          start: '09:40',
          end: '10:25'
        }
      },
      {
        sportTitle: 'แบดมินตัน (ชายเดี่ยว)',
        arena: 'สนาม: 1',
        homeTeam: {
          name: 'KMUTT',
          logo: '/images/KMUTT_logo.png'
        },
        awayTeam: {
          name: 'KMITL',
          logo: '/images/KMITL_logo.png'
        },
        preiod: {
          start: '11:00',
          end: '11:15'
        }
      },
      {
        sportTitle: 'แบดมินตัน (ชายเดี่ยว)',
        arena: 'สนาม: 4',
        homeTeam: {
          name: 'KMUTNB BKK',
          logo: '/images/KMUTNB_logo.png'
        },
        awayTeam: {
          name: 'KMUTNB PR',
          logo: '/images/KMUTNB_logo.png'
        },
        preiod: {
          start: '11:40',
          end: '12:15'
        }
      }
    ]
  },
  {
    title: 'หญิงเดี่ยว',
    scheduleData: [
      {
        sportTitle: 'แบดมินตัน (หญิงเดี่ยว)',
        arena: 'สนาม: 3',
        homeTeam: {
          name: 'KMITL',
          logo: '/images/KMITL_logo.png'
        },
        awayTeam: {
          name: 'KMUTNB PR',
          logo: '/images/KMUTNB_logo.png'
        },
        preiod: {
          start: '09:00',
          end: '09:35'
        }
      },
      {
        sportTitle: 'แบดมินตัน (หญิงเดี่ยว)',
        arena: 'สนาม: 4',
        homeTeam: {
          name: 'KMUTNB BKK',
          logo: '/images/KMUTNB_logo.png'
        },
        awayTeam: {
          name: 'KMUTT',
          logo: '/images/KMUTT_logo.png'
        },
        preiod: {
          start: '09:40',
          end: '10:25'
        }
      },
      {
        sportTitle: 'แบดมินตัน (หญิงเดี่ยว)',
        arena: 'สนาม: 1',
        homeTeam: {
          name: 'KMUTT',
          logo: '/images/KMUTT_logo.png'
        },
        awayTeam: {
          name: 'KMITL',
          logo: '/images/KMITL_logo.png'
        },
        preiod: {
          start: '11:00',
          end: '11:15'
        }
      },
      {
        sportTitle: 'แบดมินตัน (หญิงเดี่ยว)',
        arena: 'สนาม: 4',
        homeTeam: {
          name: 'KMUTNB BKK',
          logo: '/images/KMUTNB_logo.png'
        },
        awayTeam: {
          name: 'KMUTNB PR',
          logo: '/images/KMUTNB_logo.png'
        },
        preiod: {
          start: '11:40',
          end: '12:15'
        }
      }
    ]
  },
  {
    title: 'หญิงคู่',
    scheduleData: [
      {
        sportTitle: 'แบดมินตัน (หญิงคู่)',
        arena: 'สนาม: 3',
        homeTeam: {
          name: 'KMITL',
          logo: '/images/KMITL_logo.png'
        },
        awayTeam: {
          name: 'KMUTNB PR',
          logo: '/images/KMUTNB_logo.png'
        },
        preiod: {
          start: '09:00',
          end: '09:35'
        }
      },
      {
        sportTitle: 'แบดมินตัน (หญิงคู่)',
        arena: 'สนาม: 4',
        homeTeam: {
          name: 'KMUTNB BKK',
          logo: '/images/KMUTNB_logo.png'
        },
        awayTeam: {
          name: 'KMUTT',
          logo: '/images/KMUTT_logo.png'
        },
        preiod: {
          start: '09:40',
          end: '10:25'
        }
      },
      {
        sportTitle: 'แบดมินตัน (หญิงคู่)',
        arena: 'สนาม: 1',
        homeTeam: {
          name: 'KMUTT',
          logo: '/images/KMUTT_logo.png'
        },
        awayTeam: {
          name: 'KMITL',
          logo: '/images/KMITL_logo.png'
        },
        preiod: {
          start: '11:00',
          end: '11:15'
        }
      },
      {
        sportTitle: 'แบดมินตัน (หญิงคู่)',
        arena: 'สนาม: 4',
        homeTeam: {
          name: 'KMUTNB BKK',
          logo: '/images/KMUTNB_logo.png'
        },
        awayTeam: {
          name: 'KMUTNB PR',
          logo: '/images/KMUTNB_logo.png'
        },
        preiod: {
          start: '11:40',
          end: '12:15'
        }
      }
    ]
  }
]

export const pingpongScheduleData: MixedScheduleData[] = [
  {
    title: 'หญิงคู่',
    scheduleData: [
      {
        sportTitle: 'ปิงปอง (หญิงคู่)',
        homeTeam: {
          name: 'KMITL',
          logo: '/images/KMITL_logo.png'
        },
        awayTeam: {
          name: 'KMUTNB PR',
          logo: '/images/KMUTNB_logo.png'
        },
        preiod: {
          start: '09:00',
          end: '09:35'
        }
      },
      {
        sportTitle: 'ปิงปอง (หญิงคู่)',
        homeTeam: {
          name: 'KMUTNB BKK',
          logo: '/images/KMUTNB_logo.png'
        },
        awayTeam: {
          name: 'KMUTT',
          logo: '/images/KMUTT_logo.png'
        },
        preiod: {
          start: '09:40',
          end: '10:25'
        }
      },
      {
        sportTitle: 'ปิงปอง (หญิงคู่)',
        homeTeam: {
          name: 'KMUTT',
          logo: '/images/KMUTT_logo.png'
        },
        awayTeam: {
          name: 'KMITL',
          logo: '/images/KMITL_logo.png'
        },
        preiod: {
          start: '11:00',
          end: '11:15'
        }
      },
      {
        sportTitle: 'ปิงปอง (หญิงคู่)',
        homeTeam: {
          name: 'KMUTNB BKK',
          logo: '/images/KMUTNB_logo.png'
        },
        awayTeam: {
          name: 'KMUTNB PR',
          logo: '/images/KMUTNB_logo.png'
        },
        preiod: {
          start: '11:40',
          end: '12:15'
        }
      }
    ]
  },
  {
    title: 'ชายคู่',
    scheduleData: [
      {
        sportTitle: 'ปิงปอง (ชายคู่)',
        homeTeam: {
          name: 'KMITL',
          logo: '/images/KMITL_logo.png'
        },
        awayTeam: {
          name: 'KMUTNB PR',
          logo: '/images/KMUTNB_logo.png'
        },
        preiod: {
          start: '09:00',
          end: '09:35'
        }
      },
      {
        sportTitle: 'ปิงปอง (ชายคู่)',
        homeTeam: {
          name: 'KMUTNB BKK',
          logo: '/images/KMUTNB_logo.png'
        },
        awayTeam: {
          name: 'KMUTT',
          logo: '/images/KMUTT_logo.png'
        },
        preiod: {
          start: '09:40',
          end: '10:25'
        }
      },
      {
        sportTitle: 'ปิงปอง (ชายคู่)',
        homeTeam: {
          name: 'KMUTT',
          logo: '/images/KMUTT_logo.png'
        },
        awayTeam: {
          name: 'KMITL',
          logo: '/images/KMITL_logo.png'
        },
        preiod: {
          start: '11:00',
          end: '11:15'
        }
      },
      {
        sportTitle: 'ปิงปอง (ชายคู่)',
        homeTeam: {
          name: 'KMUTNB BKK',
          logo: '/images/KMUTNB_logo.png'
        },
        awayTeam: {
          name: 'KMUTNB PR',
          logo: '/images/KMUTNB_logo.png'
        },
        preiod: {
          start: '11:40',
          end: '12:15'
        }
      }
    ]
  },
  {
    title: 'หญิงเดี่ยว',
    scheduleData: [
      {
        sportTitle: 'ปิงปอง (หญิงเดี่ยว)',
        homeTeam: {
          name: 'KMITL',
          logo: '/images/KMITL_logo.png'
        },
        awayTeam: {
          name: 'KMUTNB PR',
          logo: '/images/KMUTNB_logo.png'
        },
        preiod: {
          start: '09:00',
          end: '09:35'
        }
      },
      {
        sportTitle: 'ปิงปอง (หญิงเดี่ยว)',
        homeTeam: {
          name: 'KMUTNB BKK',
          logo: '/images/KMUTNB_logo.png'
        },
        awayTeam: {
          name: 'KMUTT',
          logo: '/images/KMUTT_logo.png'
        },
        preiod: {
          start: '09:40',
          end: '10:25'
        }
      },
      {
        sportTitle: 'ปิงปอง (หญิงเดี่ยว)',
        homeTeam: {
          name: 'KMUTT',
          logo: '/images/KMUTT_logo.png'
        },
        awayTeam: {
          name: 'KMITL',
          logo: '/images/KMITL_logo.png'
        },
        preiod: {
          start: '11:00',
          end: '11:15'
        }
      },
      {
        sportTitle: 'ปิงปอง (หญิงเดี่ยว)',
        homeTeam: {
          name: 'KMUTNB BKK',
          logo: '/images/KMUTNB_logo.png'
        },
        awayTeam: {
          name: 'KMUTNB PR',
          logo: '/images/KMUTNB_logo.png'
        },
        preiod: {
          start: '11:40',
          end: '12:15'
        }
      }
    ]
  },
  {
    title: 'ชายเดี่ยว',
    scheduleData: [
      {
        sportTitle: 'ปิงปอง (ชายเดี่ยว)',
        homeTeam: {
          name: 'KMITL',
          logo: '/images/KMITL_logo.png'
        },
        awayTeam: {
          name: 'KMUTNB PR',
          logo: '/images/KMUTNB_logo.png'
        },
        preiod: {
          start: '09:00',
          end: '09:35'
        }
      },
      {
        sportTitle: 'ปิงปอง (ชายเดี่ยว)',
        homeTeam: {
          name: 'KMUTNB BKK',
          logo: '/images/KMUTNB_logo.png'
        },
        awayTeam: {
          name: 'KMUTT',
          logo: '/images/KMUTT_logo.png'
        },
        preiod: {
          start: '09:40',
          end: '10:25'
        }
      },
      {
        sportTitle: 'ปิงปอง (ชายเดี่ยว)',
        homeTeam: {
          name: 'KMUTT',
          logo: '/images/KMUTT_logo.png'
        },
        awayTeam: {
          name: 'KMITL',
          logo: '/images/KMITL_logo.png'
        },
        preiod: {
          start: '11:00',
          end: '11:15'
        }
      },
      {
        sportTitle: 'ปิงปอง (ชายเดี่ยว)',
        homeTeam: {
          name: 'KMUTNB BKK',
          logo: '/images/KMUTNB_logo.png'
        },
        awayTeam: {
          name: 'KMUTNB PR',
          logo: '/images/KMUTNB_logo.png'
        },
        preiod: {
          start: '11:40',
          end: '12:15'
        }
      }
    ]
  },
  {
    title: 'คู่ผสม',
    scheduleData: [
      {
        sportTitle: 'ปิงปอง (คู่ผสม)',
        homeTeam: {
          name: 'KMUTT',
          logo: '/images/KMUTT_logo.png'
        },
        awayTeam: {
          name: 'KMITL',
          logo: '/images/KMITL_logo.png'
        },
        preiod: {
          start: '09:40',
          end: '10:25'
        }
      },
      {
        sportTitle: 'ปิงปอง (คู่ผสม)',
        homeTeam: {
          name: 'KMUTNB BKK',
          logo: '/images/KMUTNB_logo.png'
        },
        awayTeam: {
          name: 'KMUTNB PR',
          logo: '/images/KMUTNB_logo.png'
        },
        preiod: {
          start: '10:20',
          end: '10:55'
        }
      },
      {
        sportTitle: 'ปิงปอง (คู่ผสม)',
        homeTeam: {
          name: 'KMUTT',
          logo: '/images/KMUTT_logo.png'
        },
        awayTeam: {
          name: 'KMITL',
          logo: '/images/KMITL_logo.png'
        },
        preiod: {
          start: '11:00',
          end: '11:35'
        }
      },
      {
        sportTitle: 'ปิงปอง (คู่ผสม)',
        homeTeam: {
          name: 'KMUTNB BKK',
          logo: '/images/KMUTNB_logo.png'
        },
        awayTeam: {
          name: 'KMUTT',
          logo: '/images/KMUTT_logo.png'
        },
        preiod: {
          start: '11:40',
          end: '11:35'
        }
      },
      {
        sportTitle: 'ปิงปอง (คู่ผสม)',
        homeTeam: {
          name: 'KMUTNB PR',
          logo: '/images/KMUTNB_logo.png'
        },
        awayTeam: {
          name: 'KMITL',
          logo: '/images/KMITL_logo.png'
        },
        preiod: {
          start: '11:40',
          end: '11:35'
        }
      }
    ]
  }
]

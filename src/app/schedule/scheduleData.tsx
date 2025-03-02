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
  location: 'field' | 'gym'
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

export const traditionGameScheduleData: ScheduleData[] = [
  {
    sportTitle: 'ชักเย่อ',
    location: 'field',
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
    location: 'field',
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
    location: 'field',
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
    location: 'field',
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
    location: 'field',
    preiod: {
      start: '15:20',
      end: '15:35'
    }
  },
  {
    sportTitle: 'วิ่งเปรี้ยว',
    location: 'field',
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
    location: 'field',
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
    location: 'field',
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
    location: 'field',
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
    location: 'gym',
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
    location: 'gym',
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
    location: 'gym',
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
    location: 'gym',
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
    location: 'gym',
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
    location: 'gym',
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
    location: 'field',
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
    location: 'field',
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
    location: 'field',
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
    location: 'field',
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
        location: 'gym',
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
        location: 'gym',
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
        location: 'gym',
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
        location: 'gym',
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
        location: 'gym',
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
          start: '18:40',
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
        location: 'gym',
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
          start: '18:00',
          end: '09:35'
        }
      },
      {
        sportTitle: 'แบดมินตัน (ชายคู่)',
        location: 'gym',
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
        location: 'gym',
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
        location: 'gym',
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
        location: 'gym',
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
        location: 'gym',
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
        location: 'gym',
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
        location: 'gym',
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
        location: 'gym',
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
        location: 'gym',
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
        location: 'gym',
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
        location: 'gym',
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
        location: 'gym',
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
        location: 'gym',
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
        location: 'gym',
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
        location: 'gym',
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
        location: 'gym',
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
        location: 'gym',
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
        location: 'gym',
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
        location: 'gym',
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
        location: 'gym',
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
        location: 'gym',
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
        location: 'gym',
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
        location: 'gym',
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
        location: 'gym',
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
        location: 'gym',
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
        location: 'gym',
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
        location: 'gym',
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
        location: 'gym',
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
        location: 'gym',
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
        location: 'gym',
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
        location: 'gym',
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
        location: 'gym',
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
        location: 'gym',
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
        location: 'gym',
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
        location: 'gym',
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
        location: 'gym',
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

const splitMixedScheduleData = (data: MixedScheduleData[]): ScheduleData[] => {
  const temps: ScheduleData[] = []
  data.forEach((d) => {
    d.scheduleData.forEach((sd) => temps.push(sd))
  })
  return temps
}

export const scheduleData: ScheduleData[] = [
  ...footballScheduleData,
  ...basketballScheduleData,
  ...traditionGameScheduleData,
  ...splitMixedScheduleData(badmintonScheduleData),
  ...splitMixedScheduleData(pingpongScheduleData)
]

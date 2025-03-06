import { Team, TeamLogos } from '@/shared/utils/team'
import { JSX } from 'react'

export type UniversityTeamName =
  | Team.KMUTT
  | Team.KMITL
  | Team.KMUTNB
  | Team.KMUTNB_PR
export type Sport =
  | 'ฟุตบอล'
  | 'กีฬาพื้นบ้าน'
  | 'บาสเกตบอล'
  | 'ปิงปอง'
  | 'ชักเย่อ'
  | 'กินวิบาก'
  | 'วิ่งเปรี้ยว'
  | 'แบดมินตัน'

export interface ScheduleData {
  sportTitle: string
  icon?: string | JSX.Element
  place?: string
  isFinal?: boolean
  location: 'field' | 'gym'
  homeTeam?: {
    name: string
    title?: string
    logo?: string
  }
  awayTeam?: {
    name: string
    title?: string
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
      name: Team.KMUTT,
      logo: TeamLogos.KMUTT
    },
    awayTeam: {
      name: Team.KMUTNB,
      logo: TeamLogos.KMUTNB
    },
    preiod: {
      start: '15:15',
      end: '15:20'
    }
  },
  {
    sportTitle: 'ชักเย่อ',
    location: 'field',
    homeTeam: {
      name: Team.KMITL,
      logo: TeamLogos.KMITL
    },
    awayTeam: {
      name: Team.KMUTNB_PR,
      logo: TeamLogos[Team.KMUTNB_PR]
    },
    preiod: {
      start: '15:20',
      end: '15:25'
    }
  },
  {
    sportTitle: 'ชักเย่อชิงชนะเลิศอันดับ 1',
    location: 'field',
    isFinal: true,
    homeTeam: {
      name: '',
      title: 'ชนะคู่ 1'
    },
    awayTeam: {
      name: '',
      title: 'ชนะคู่ 2'
    },
    preiod: {
      start: '15:25',
      end: '15:30'
    }
  },
  {
    sportTitle: 'ชักเย่อชิงชนะเลิศอันดับ 3',
    location: 'field',
    isFinal: true,
    homeTeam: {
      name: '',
      title: 'แพ้คู่ 1'
    },
    awayTeam: {
      name: '',
      title: 'แพ้คู่ 2'
    },
    preiod: {
      start: '15:30',
      end: '15:35'
    }
  },
  {
    sportTitle: 'กินวิบาก',
    location: 'field',
    preiod: {
      start: '15:40',
      end: '15:50'
    }
  },
  {
    sportTitle: 'วิ่งเปรี้ยว',
    location: 'field',
    homeTeam: {
      name: Team.KMUTT,
      logo: TeamLogos.KMUTT
    },
    awayTeam: {
      name: Team.KMUTNB,
      logo: TeamLogos.KMUTNB
    },
    preiod: {
      start: '15:55',
      end: '16:00'
    }
  },
  {
    sportTitle: 'วิ่งเปรี้ยว',
    location: 'field',
    homeTeam: {
      name: Team.KMITL,
      logo: TeamLogos.KMITL
    },
    awayTeam: {
      name: Team.KMUTNB_PR,
      logo: TeamLogos[Team.KMUTNB_PR]
    },
    preiod: {
      start: '16:00',
      end: '16:05'
    }
  },
  {
    sportTitle: 'ชักเย่อชิงชนะเลิศอันดับ 1',
    location: 'field',
    isFinal: true,
    homeTeam: {
      name: '',
      title: 'ชนะคู่ 1'
    },
    awayTeam: {
      name: '',
      title: 'ชนะคู่ 2'
    },
    preiod: {
      start: '16:05',
      end: '16:10'
    }
  },
  {
    sportTitle: 'ชักเย่อชิงชนะเลิศอันดับ 3',
    location: 'field',
    isFinal: true,
    homeTeam: {
      name: '',
      title: 'แพ้คู่ 1'
    },
    awayTeam: {
      name: '',
      title: 'แพ้คู่ 2'
    },
    preiod: {
      start: '16:10',
      end: '16:15'
    }
  }
]

export const basketballScheduleData: ScheduleData[] = [
  {
    sportTitle: 'บาสเกตบอล',
    location: 'gym',
    homeTeam: {
      name: Team.KMUTT,
      logo: TeamLogos.KMUTT
    },
    awayTeam: {
      name: Team.KMUTNB,
      logo: TeamLogos.KMUTNB
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
      name: Team.KMUTNB_PR,
      logo: TeamLogos[Team.KMUTNB_PR]
    },
    awayTeam: {
      name: Team.KMITL,
      logo: TeamLogos.KMITL
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
      name: Team.KMUTT,
      logo: TeamLogos.KMUTT
    },
    awayTeam: {
      name: Team.KMITL,
      logo: TeamLogos.KMITL
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
      name: Team.KMUTNB,
      logo: TeamLogos.KMUTNB
    },
    awayTeam: {
      name: Team.KMUTNB_PR,
      logo: TeamLogos[Team.KMUTNB_PR]
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
      name: Team.KMUTT,
      logo: TeamLogos.KMUTT
    },
    awayTeam: {
      name: Team.KMUTNB_PR,
      logo: TeamLogos[Team.KMUTNB_PR]
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
      name: Team.KMUTNB,
      logo: TeamLogos.KMUTNB
    },
    awayTeam: {
      name: Team.KMITL,
      logo: TeamLogos.KMITL
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
      name: Team.KMUTT,
      logo: TeamLogos.KMUTT
    },
    awayTeam: {
      name: 'KMUTNB RP',
      logo: TeamLogos[Team.KMUTNB_PR]
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
      name: Team.KMUTNB,
      logo: TeamLogos.KMUTNB
    },
    awayTeam: {
      name: Team.KMITL,
      logo: TeamLogos.KMITL
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
      name: Team.KMUTT,
      logo: TeamLogos.KMUTT
    },
    awayTeam: {
      name: Team.KMITL,
      logo: TeamLogos.KMITL
    },
    preiod: {
      start: '11:30',
      end: '12:40'
    }
  },
  {
    sportTitle: 'ฟุตบอลรอบชิงชนะเลิศ',
    location: 'field',
    isFinal: true,
    homeTeam: {
      name: '',
      title: 'คะแนนรวมอันดับที่ 1'
    },
    awayTeam: {
      name: '',
      title: 'คะแนนรวมอันดับที่ 2'
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
        place: 'สนาม: 1',
        homeTeam: {
          name: Team.KMUTT,
          logo: TeamLogos.KMUTT
        },
        awayTeam: {
          name: Team.KMITL,
          logo: TeamLogos.KMITL
        },
        preiod: {
          start: '09:40',
          end: '10:25'
        }
      },
      {
        sportTitle: 'แบดมินตัน (คู่ผสม)',
        location: 'gym',
        place: 'สนาม: 2',
        homeTeam: {
          name: Team.KMUTNB,
          logo: TeamLogos.KMUTNB
        },
        awayTeam: {
          name: Team.KMUTNB_PR,
          logo: TeamLogos[Team.KMUTNB_PR]
        },
        preiod: {
          start: '10:20',
          end: '10:55'
        }
      },
      {
        sportTitle: 'แบดมินตัน (คู่ผสม)',
        location: 'gym',
        place: 'สนาม: 4',
        homeTeam: {
          name: Team.KMUTT,
          logo: TeamLogos.KMUTT
        },
        awayTeam: {
          name: Team.KMITL,
          logo: TeamLogos.KMITL
        },
        preiod: {
          start: '11:00',
          end: '11:35'
        }
      },
      {
        sportTitle: 'แบดมินตัน (คู่ผสม)',
        location: 'gym',
        place: 'สนาม: 3',
        homeTeam: {
          name: Team.KMUTNB,
          logo: TeamLogos.KMUTNB
        },
        awayTeam: {
          name: Team.KMUTT,
          logo: TeamLogos.KMUTT
        },
        preiod: {
          start: '11:40',
          end: '11:35'
        }
      },
      {
        sportTitle: 'แบดมินตัน (คู่ผสม)',
        location: 'gym',
        place: 'สนาม: 2',
        homeTeam: {
          name: Team.KMUTNB_PR,
          logo: TeamLogos[Team.KMUTNB_PR]
        },
        awayTeam: {
          name: Team.KMITL,
          logo: TeamLogos.KMITL
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
        sportTitle: 'แบดมินตัน (ชายคู่)',
        location: 'gym',
        place: 'สนาม: 3',
        homeTeam: {
          name: Team.KMITL,
          logo: TeamLogos.KMITL
        },
        awayTeam: {
          name: Team.KMUTNB_PR,
          logo: TeamLogos[Team.KMUTNB_PR]
        },
        preiod: {
          start: '09:00',
          end: '09:35'
        }
      },
      {
        sportTitle: 'แบดมินตัน (ชายคู่)',
        location: 'gym',
        place: 'สนาม: 4',
        homeTeam: {
          name: Team.KMUTNB,
          logo: TeamLogos.KMUTNB
        },
        awayTeam: {
          name: Team.KMUTT,
          logo: TeamLogos.KMUTT
        },
        preiod: {
          start: '09:40',
          end: '10:25'
        }
      },
      {
        sportTitle: 'แบดมินตัน (ชายคู่)',
        location: 'gym',
        place: 'สนาม: 1',
        homeTeam: {
          name: Team.KMUTT,
          logo: TeamLogos.KMUTT
        },
        awayTeam: {
          name: Team.KMITL,
          logo: TeamLogos.KMITL
        },
        preiod: {
          start: '11:00',
          end: '11:35'
        }
      },
      {
        sportTitle: 'แบดมินตัน (ชายคู่)',
        location: 'gym',
        place: 'สนาม: 4',
        homeTeam: {
          name: Team.KMUTNB,
          logo: TeamLogos.KMUTNB
        },
        awayTeam: {
          name: Team.KMUTNB_PR,
          logo: TeamLogos[Team.KMUTNB_PR]
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
        place: 'สนาม: 3',
        homeTeam: {
          name: Team.KMUTT,
          logo: TeamLogos.KMUTT
        },
        awayTeam: {
          name: Team.KMUTNB_PR,
          logo: TeamLogos[Team.KMUTNB_PR]
        },
        preiod: {
          start: '09:00',
          end: '09:35'
        }
      },
      {
        sportTitle: 'แบดมินตัน (ชายเดี่ยว)',
        location: 'gym',
        place: 'สนาม: 4',
        homeTeam: {
          name: Team.KMITL,
          logo: TeamLogos.KMITL
        },
        awayTeam: {
          name: Team.KMUTT,
          logo: TeamLogos.KMUTT
        },
        preiod: {
          start: '09:40',
          end: '10:25'
        }
      },
      {
        sportTitle: 'แบดมินตัน (ชายเดี่ยว)',
        location: 'gym',
        place: 'สนาม: 1',
        homeTeam: {
          name: Team.KMITL,
          logo: TeamLogos.KMITL
        },
        awayTeam: {
          name: Team.KMUTNB_PR,
          logo: TeamLogos[Team.KMUTNB_PR]
        },
        preiod: {
          start: '10:20',
          end: '10:55'
        }
      },
      {
        sportTitle: 'แบดมินตัน (ชายเดี่ยว)',
        location: 'gym',
        place: 'สนาม: 4',
        homeTeam: {
          name: Team.KMUTNB,
          logo: TeamLogos.KMUTNB
        },
        awayTeam: {
          name: Team.KMUTT,
          logo: TeamLogos.KMUTT
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
        place: 'สนาม: 2',
        homeTeam: {
          name: Team.KMITL,
          logo: TeamLogos.KMITL
        },
        awayTeam: {
          name: Team.KMUTNB,
          logo: TeamLogos.KMUTNB
        },
        preiod: {
          start: '09:00',
          end: '09:35'
        }
      },
      {
        sportTitle: 'แบดมินตัน (หญิงเดี่ยว)',
        location: 'gym',
        place: 'สนาม: 3',
        homeTeam: {
          name: Team.KMITL,
          logo: TeamLogos.KMITL
        },
        awayTeam: {
          name: Team.KMUTNB_PR,
          logo: TeamLogos[Team.KMUTNB_PR]
        },
        preiod: {
          start: '09:40',
          end: '10:25'
        }
      },
      {
        sportTitle: 'แบดมินตัน (หญิงเดี่ยว)',
        location: 'gym',
        place: 'สนาม: 4',
        homeTeam: {
          name: Team.KMUTNB_PR,
          logo: TeamLogos[Team.KMUTNB_PR]
        },
        awayTeam: {
          name: Team.KMUTT,
          logo: TeamLogos.KMUTT
        },
        preiod: {
          start: '09:00',
          end: '09:35'
        }
      },
      {
        sportTitle: 'แบดมินตัน (หญิงเดี่ยว)',
        location: 'gym',
        place: 'สนาม: 4',
        homeTeam: {
          name: Team.KMUTT,
          logo: TeamLogos.KMUTT
        },
        awayTeam: {
          name: Team.KMUTNB,
          logo: TeamLogos.KMUTNB
        },
        preiod: {
          start: '10:20',
          end: '10:35'
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
        place: 'สนาม: 1',
        homeTeam: {
          name: Team.KMITL,
          logo: TeamLogos.KMITL
        },
        awayTeam: {
          name: Team.KMUTNB,
          logo: TeamLogos.KMUTNB
        },
        preiod: {
          start: '10:20',
          end: '10:55'
        }
      },
      {
        sportTitle: 'แบดมินตัน (หญิงคู่)',
        location: 'gym',
        place: 'สนาม: 2',
        homeTeam: {
          name: Team.KMUTNB,
          logo: TeamLogos.KMUTNB
        },
        awayTeam: {
          name: Team.KMUTT,
          logo: TeamLogos.KMUTT
        },
        preiod: {
          start: '11:00',
          end: '11:35'
        }
      },
      {
        sportTitle: 'แบดมินตัน (หญิงคู่)',
        location: 'gym',
        place: 'สนาม: 3',
        homeTeam: {
          name: Team.KMUTT,
          logo: TeamLogos.KMUTT
        },
        awayTeam: {
          name: Team.KMUTNB_PR,
          logo: TeamLogos[Team.KMUTNB_PR]
        },
        preiod: {
          start: '11:40',
          end: '12:15'
        }
      },
      {
        sportTitle: 'แบดมินตัน (หญิงคู่)',
        location: 'gym',
        place: 'สนาม: 4',
        homeTeam: {
          name: Team.KMUTNB_PR,
          logo: TeamLogos['KMUTNB PR']
        },
        awayTeam: {
          name: Team.KMITL,
          logo: TeamLogos.KMITL
        },
        preiod: {
          start: '12:20',
          end: '12:55'
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
        place: 'สนาม 1',
        homeTeam: {
          name: Team.KMITL,
          logo: TeamLogos.KMITL
        },
        awayTeam: {
          name: Team.KMUTNB_PR,
          logo: TeamLogos[Team.KMUTNB_PR]
        },
        preiod: {
          start: '10:10',
          end: '10:40'
        }
      },
      {
        sportTitle: 'ปิงปอง (หญิงคู่)',
        location: 'gym',
        place: 'สนาม 2',
        homeTeam: {
          name: Team.KMUTNB,
          logo: TeamLogos.KMUTNB
        },
        awayTeam: {
          name: Team.KMUTT,
          logo: TeamLogos.KMUTT
        },
        preiod: {
          start: '10:45',
          end: '11:15'
        }
      },
      {
        sportTitle: 'ปิงปอง (หญิงคู่)',
        location: 'gym',
        place: 'สนาม 3',
        homeTeam: {
          name: Team.KMUTT,
          logo: TeamLogos.KMUTT
        },
        awayTeam: {
          name: Team.KMUTNB_PR,
          logo: TeamLogos[Team.KMUTNB_PR]
        },
        preiod: {
          start: '11:20',
          end: '11:50'
        }
      },
      {
        sportTitle: 'ปิงปอง (หญิงคู่)',
        location: 'gym',
        place: 'สนาม 4',
        homeTeam: {
          name: Team.KMUTNB_PR,
          logo: TeamLogos[Team.KMUTNB_PR]
        },
        awayTeam: {
          name: Team.KMITL,
          logo: TeamLogos.KMITL
        },
        preiod: {
          start: '11:55',
          end: '12:25'
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
        place: 'สนาม 3',
        homeTeam: {
          name: Team.KMITL,
          logo: TeamLogos.KMITL
        },
        awayTeam: {
          name: Team.KMUTT,
          logo: TeamLogos.KMUTT
        },
        preiod: {
          start: '09:00',
          end: '09:30'
        }
      },
      {
        sportTitle: 'ปิงปอง (ชายคู่)',
        location: 'gym',
        place: 'สนาม 4',
        homeTeam: {
          name: Team.KMUTNB,
          logo: TeamLogos.KMUTNB
        },
        awayTeam: {
          name: Team.KMUTT,
          logo: TeamLogos.KMUTT
        },
        preiod: {
          start: '09:35',
          end: '10:05'
        }
      },
      {
        sportTitle: 'ปิงปอง (ชายคู่)',
        location: 'gym',
        place: 'สนาม 1',
        homeTeam: {
          name: Team.KMUTT,
          logo: TeamLogos.KMUTT
        },
        awayTeam: {
          name: Team.KMITL,
          logo: TeamLogos.KMITL
        },
        preiod: {
          start: '10:45',
          end: '11:15'
        }
      },
      {
        sportTitle: 'ปิงปอง (ชายคู่)',
        location: 'gym',
        place: 'สนาม 4',
        homeTeam: {
          name: Team.KMUTNB,
          logo: TeamLogos.KMUTNB
        },
        awayTeam: {
          name: Team.KMUTNB_PR,
          logo: TeamLogos[Team.KMUTNB_PR]
        },
        preiod: {
          start: '11:20',
          end: '11:50'
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
        place: 'สนาม 2',
        homeTeam: {
          name: Team.KMITL,
          logo: TeamLogos.KMITL
        },
        awayTeam: {
          name: Team.KMUTNB,
          logo: TeamLogos.KMUTNB
        },
        preiod: {
          start: '09:00',
          end: '09:35'
        }
      },
      {
        sportTitle: 'ปิงปอง (หญิงเดี่ยว)',
        location: 'gym',
        place: 'สนาม 4',
        homeTeam: {
          name: Team.KMUTNB,
          logo: TeamLogos.KMUTNB
        },
        awayTeam: {
          name: Team.KMUTT,
          logo: TeamLogos.KMUTT
        },
        preiod: {
          start: '09:00',
          end: '09:30'
        }
      },
      {
        sportTitle: 'ปิงปอง (หญิงเดี่ยว)',
        location: 'gym',
        place: 'สนาม 3',
        homeTeam: {
          name: Team.KMITL,
          logo: TeamLogos.KMITL
        },
        awayTeam: {
          name: Team.KMUTNB_PR,
          logo: TeamLogos[Team.KMUTNB_PR]
        },
        preiod: {
          start: '09:35',
          end: '10:05'
        }
      },
      {
        sportTitle: 'ปิงปอง (หญิงเดี่ยว)',
        location: 'gym',
        place: 'สนาม 4',
        homeTeam: {
          name: Team.KMUTNB,
          logo: TeamLogos.KMUTNB
        },
        awayTeam: {
          name: Team.KMUTNB_PR,
          logo: TeamLogos[Team.KMUTNB_PR]
        },
        preiod: {
          start: '10:10',
          end: '10:40'
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
        place: 'สนาม 1',
        homeTeam: {
          name: Team.KMUTT,
          logo: TeamLogos.KMUTT
        },
        awayTeam: {
          name: Team.KMUTNB_PR,
          logo: TeamLogos[Team.KMUTNB_PR]
        },
        preiod: {
          start: '09:00',
          end: '09:30'
        }
      },
      {
        sportTitle: 'ปิงปอง (ชายเดี่ยว)',
        location: 'gym',
        place: 'สนาม 2',
        homeTeam: {
          name: Team.KMITL,
          logo: TeamLogos.KMITL
        },
        awayTeam: {
          name: Team.KMUTT,
          logo: TeamLogos.KMUTT
        },
        preiod: {
          start: '09:35',
          end: '10:05'
        }
      },
      {
        sportTitle: 'ปิงปอง (ชายเดี่ยว)',
        location: 'gym',
        place: 'สนาม 3',
        homeTeam: {
          name: Team.KMUTNB_PR,
          logo: TeamLogos[Team.KMUTNB_PR]
        },
        awayTeam: {
          name: Team.KMITL,
          logo: TeamLogos.KMITL
        },
        preiod: {
          start: '10:10',
          end: '10:40'
        }
      },
      {
        sportTitle: 'ปิงปอง (ชายเดี่ยว)',
        location: 'gym',
        place: 'สนาม 1',
        homeTeam: {
          name: Team.KMUTNB,
          logo: TeamLogos.KMUTNB
        },
        awayTeam: {
          name: Team.KMUTT,
          logo: TeamLogos.KMUTT
        },
        preiod: {
          start: '11:20',
          end: '11:50'
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
        place: 'สนาม 1',
        homeTeam: {
          name: Team.KMUTT,
          logo: TeamLogos.KMUTT
        },
        awayTeam: {
          name: Team.KMITL,
          logo: TeamLogos.KMITL
        },
        preiod: {
          start: '09:35',
          end: '10:05'
        }
      },
      {
        sportTitle: 'ปิงปอง (คู่ผสม)',
        location: 'gym',
        place: 'สนาม 2',
        homeTeam: {
          name: Team.KMUTNB,
          logo: TeamLogos.KMUTNB
        },
        awayTeam: {
          name: Team.KMUTNB_PR,
          logo: TeamLogos[Team.KMUTNB_PR]
        },
        preiod: {
          start: '10:10',
          end: '10:40'
        }
      },
      {
        sportTitle: 'ปิงปอง (คู่ผสม)',
        location: 'gym',
        place: 'สนาม 3',
        homeTeam: {
          name: Team.KMUTNB,
          logo: TeamLogos.KMUTNB
        },
        awayTeam: {
          name: Team.KMUTT,
          logo: TeamLogos.KMUTT
        },
        preiod: {
          start: '10:45',
          end: '11:15'
        }
      },
      {
        sportTitle: 'ปิงปอง (คู่ผสม)',
        location: 'gym',
        place: 'สนาม 4',
        homeTeam: {
          name: Team.KMUTT,
          logo: TeamLogos.KMUTT
        },
        awayTeam: {
          name: Team.KMITL,
          logo: TeamLogos.KMITL
        },
        preiod: {
          start: '10:40',
          end: '11:15'
        }
      }
    ]
  }
]

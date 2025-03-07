import { Team, TeamLogos } from '@/shared/utils/team'
import { JSX } from 'react'

export type UniversityTeamName =
  | Team.KMUTT
  | Team.KMITL
  | Team.KMUTNB
  | Team.KMUTNB_PR
export type Sport =
  | 'Football'
  | 'กีฬาพื้นบ้าน'
  | 'Basketball'
  | 'Table Tennis'
  | 'Badminton'

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
    sportTitle: 'Basketball',
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
    sportTitle: 'Basketball',
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
    sportTitle: 'Basketball',
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
    sportTitle: 'Basketball',
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
    sportTitle: 'Basketball',
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
    sportTitle: 'Basketball',
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
    sportTitle: 'Football',
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
    sportTitle: 'Football',
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
    sportTitle: 'Football',
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
    sportTitle: 'Football Final',
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
    title: "Mixed's Doubles",
    scheduleData: [
      {
        sportTitle: 'Badminton (MX)',
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
        sportTitle: 'Badminton (MX)',
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
        sportTitle: 'Badminton (MX)',
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
        sportTitle: 'Badminton (MX)',
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
        sportTitle: 'Badminton (MX)',
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
    title: "Men's Doubles",
    scheduleData: [
      {
        sportTitle: 'Badminton (MD)',
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
        sportTitle: 'Badminton (MD)',
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
        sportTitle: 'Badminton (MD)',
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
        sportTitle: 'Badminton (MD)',
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
    title: "Men's Singles",
    scheduleData: [
      {
        sportTitle: 'Badminton (MS)',
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
        sportTitle: 'Badminton (MS)',
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
        sportTitle: 'Badminton (MS)',
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
        sportTitle: 'Badminton (MS)',
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
    title: "Women's Single",
    scheduleData: [
      {
        sportTitle: 'Badminton (WS)',
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
        sportTitle: 'Badminton (WS)',
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
        sportTitle: 'Badminton (WS)',
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
        sportTitle: 'Badminton (WS)',
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
    title: "Women's Doubles",
    scheduleData: [
      {
        sportTitle: 'Badminton (WD)',
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
        sportTitle: 'Badminton (WD)',
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
        sportTitle: 'Badminton (WD)',
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
        sportTitle: 'Badminton (WD)',
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
    title: "Women's Doubles",
    scheduleData: [
      {
        sportTitle: 'Table Tennis (WD)',
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
        sportTitle: 'Table Tennis (WD)',
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
        sportTitle: 'Table Tennis (WD)',
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
        sportTitle: 'Table Tennis (WD)',
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
    title: "Men's Doubles",
    scheduleData: [
      {
        sportTitle: 'Table Tennis (MD)',
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
        sportTitle: 'Table Tennis (MD)',
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
        sportTitle: 'Table Tennis (MD)',
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
        sportTitle: 'Table Tennis (MD)',
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
    title: "Women's Singles",
    scheduleData: [
      {
        sportTitle: 'Table Tennis (WS)',
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
        sportTitle: 'Table Tennis (WS)',
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
        sportTitle: 'Table Tennis (WS)',
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
        sportTitle: 'Table Tennis (WS)',
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
    title: "Men's Singles",
    scheduleData: [
      {
        sportTitle: 'Table Tennis (MS)',
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
        sportTitle: 'Table Tennis (MS)',
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
        sportTitle: 'Table Tennis (MS)',
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
        sportTitle: 'Table Tennis (MS)',
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
    title: "Mixed's Doubles",
    scheduleData: [
      {
        sportTitle: 'Table Tennis (MX)',
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
        sportTitle: 'Table Tennis (MX)',
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
        sportTitle: 'Table Tennis (MX)',
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
        sportTitle: 'Table Tennis (MX)',
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

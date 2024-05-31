type participants = {
  userId: number;
  userImage: string;
  userName: string;
};
//모임
export type GatheringListByCategory = {
  leaderId: number;
  meetingId: number;
  meetingName: string;
  categoryName: string;
  mountainName: string;
  description: string;
  headcount: number;
  date: string;
  tags: string;
  image: string;
  participants: participants[];
};

export type GatheringListResponse = {
  content: GatheringListByCategory[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
};

export type GatheringDetailType = {
  meetingId: number;
  leaderId: number;
  userEmail: string;
  meetingName: string;
  categoryName: string;
  mountainName: string;
  description: string;
  headcount: number;
  date: string;
  tags: string[];
  image: string;
  imageFile: string;
  participants: [
    {
      userId: number;
      userName: string;
      userImage: string;
      userNickname: string;
    },
  ];
};

export type UserReport = {
  reason: string;
  reportedParticipantId: number;
};
export type GatheringCategoryType = {
  id: number;
  name: string;
};

export type PostType = {
  meetingName: string;
  categoryName: string;
  mountainName: string;
  description: string;
  headcount: string;
  date: string;
  tags: string[];
  image: string | null;
};

export const posts = [
  {
    _id: "1",
    title: "Saw you on the subway",
    encounterDescription:
      "You were reading a book with a red cover. Our eyes met, but I hesitated...",
    encounterCity: { _id: 1, City: "Athens", Region: "Attica" },
    encounterPoint: "subway",
    gender: "male",
    targetGender: "female",
    createdAt: "2025-03-04T08:37:05.542+00:00",
    encounterDate: "2024-01-14",
    interests: [{ nickname: "LeZed" }, { nickname: "NikosZoros" }],
    user: { _id: "5", nickname: "NikosZoros", gender: "male" },
    comments: [
      { text: "Esena leei ksipna", user: "NikosZoros" },
      { text: "Ela na ton pareis", user: "NikosZoros" },
      { text: "Ela na ton pareis", user: "NikosZoros" },
      { text: "Ela na ton pareis", user: "NikosZoros" },
      { text: "Ela na ton pareis", user: "NikosZoros" },
      { text: "Ela na ton pareis", user: "NikosZoros" },
      { text: "Ela na ton pareis", user: "NikosZoros" },
      { text: "Ela na ton pareis", user: "NikosZoros" },
      { text: "Ela na ton pareis", user: "NikosZoros" },
      { text: "Ela na ton pareis", user: "NikosZoros" },
    ],
  },
  {
    _id: "2",
    title: "Saw you on the Restaurant",
    encounterDescription:
      "You were reading eating a fish. I loved Your voice when you ordered",
    encounterCity: { _id: 1, City: "Athens", Region: "Attica" },
    encounterPoint: "MeZen",
    gender: "male",
    targetGender: "female",
    createdAt: "2025-03-07T08:13:02.578+00:00",
    encounterDate: "2024-01-14",
    interests: [{ nickname: "LeZed" }, { nickname: "NikosZoros" }],
    user: { _id: "7", nickname: "LeZedd", gender: "male" },
    comments: [
      { text: "Esena leei ksipnaaaaaa", user: "NikosZoros" },
      { text: "Ela na ton pareisssssssss", user: "NikosZoros" },
    ],
  },
  
];

export const user = {
  _id: "5",
 
  password: "1234567",
  nickname: "NikosZoros",
  gender: "male",
  city: { _id: "342342dsada3324", City: "Athens", Region: "Attica" },
  selfDescription: "psilos melaxrinos me magoula",
  targetDescription: ["Blue eyes", "Gypsy", "Blonde Dark"],
  interestedPosts: ["1"],
};

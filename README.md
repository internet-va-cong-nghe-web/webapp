# Web Application for Reading Novels and Stories

## Group members :

| STT | MSSV     | Tên               | Phân công           |
|-----|----------|-------------------|---------------------|
| 1   | 21522196 | Nguyễn Tuấn Khang  |         Front-end            |
| 2   | 22521029 | Trần Thiên Nhật    |         Front-end             |
| 3   | 20520692 | Nguyễn Gia Phú     |         Front-end             |
| 4   | 21522143 | Hứa Hồ Gia Huy     |  Quản lý mã nguồn, xây dựng server backend và xử lý lỗi frontend, phân chia công việc |
| 5   | 22520326 | Nguyễn Hà Anh Duy  |         Front-end            |

## Introduction:

Nowadays, the demand for reading novels and stories online is becoming increasingly popular, especially among young people who love the culture of reading. To meet this need, we have developed a web application for reading novels and stories, a convenient and user-friendly platform for searching, reading, and managing novels and stories from various genres.

## Use case Diagram : 

![image](https://github.com/user-attachments/assets/dfc2f3a1-4554-4638-b906-d4ab1aa1893c)

## Main Use Cases

### Guest Users:
- **Search for Stories**:
  - Guests can search for stories by keyword, genre, etc.
  - Guests can view detailed information about a story, including description, reviews, and story progress. This includes:
    - **View description**: Displays the story's summary.
    - **View story reviews**: Displays ratings and comments from other readers.
    - **View story progress**: Shows the story's status (completed or ongoing).

- **Read Some Free Stories**:
  - Guests can read some chapters or free stories without registration.

### Registered Users:
- **Read Stories**:
  - Users can read full chapters of stories, including both free and paid stories.
  - The use case "Paid Story" is an extended case from "Read Stories", meaning that users will need to pay to access these chapters.

- **Add Stories to Favorites**:
  - Registered users can mark stories they like to easily access them later.

- **Save Reading History**:
  - The system will save the user's reading history so they can resume reading from where they left off.

- **Comment and Review**:
  - Registered users can leave comments and reviews about the stories they have read.

- **Manage Account**:
  - Users can manage their personal information, including changing their username and password.

- **Payment**:
  - If users want to read paid stories, they need to perform payment transactions.

### Administrator:
- **Add/Delete Stories**:
  - Administrators have the right to add new stories or delete stories from the system.

- **Edit Story Translations**:
  - Administrators can edit the story translations (if applicable).

- **Hide/Show Comments**:
  - Administrators can manage comments by hiding or showing users' comments.

- **Ban/Block Users**:
  - Administrators have the authority to ban or block users' accounts if they violate system rules.

- **Manage Stories**:
  - Administrators can perform management actions on the entire list of stories in the system.

- **Manage Comments**:
  - Administrators can manage all comments, ensuring they comply with regulations.

- **Manage Users**:
  - Administrators manage all users in the system, including granting permissions, banning, or blocking accounts.

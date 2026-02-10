import { Status } from "./status";
import { Tag } from "./tag";
import { User } from "./user";

export interface Book {
  id: string;
  title: string;
  isbn?: number;
  publishedDate?: string;
  pageCount?: number;
  authors?: string[];
  publisher?: string;
  summary?: string;
  cover?: any;
  tags: Tag[];
  status: Status;
  user: User;
}

export const books: Book[] = [
  {
    id: 'book#1',
    title: 'Street Food',
    isbn: 1234567891234,
    publishedDate: '2026-02-10',
    pageCount: 224,
    authors: ['Jean', 'Dupond'],
    publisher: 'Ducard',
    summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis ullamcorper elit eget tincidunt. Duis bibendum cursus ante in malesuada. Donec ornare gravida nisl, id facilisis sapien euismod at. Duis mi turpis, rutrum non lacus ac, iaculis pharetra leo. Aliquam erat volutpat. Mauris et erat sodales, congue enim et, tempor velit. Proin ac dui nec lectus interdum viverra. Morbi finibus, sapien nec dignissim varius, est nulla lobortis odio, sed tristique orci nulla quis diam. Praesent sollicitudin convallis volutpat. Vivamus tincidunt posuere lectus, vitae ultrices risus pretium ac. Ut suscipit ullamcorper massa, ut congue ex consequat feugiat.',
    cover: require('@/assets/images/dummy/categories/6x9-Book-Cover-Template-edit-online.png'),
    tags: [{ id: 'tag#2', name: 'Romantique'}],
    status: {
      id: 'status#1',
      name: '',
      order: 0,
    },
    user: {
      id: 'user#1',
      name: 'Bob Eagle',
      email: 'bob.eagle@mail.com',
    }
  },
  {
    id: 'book#2',
    title: 'Burger',
    isbn: 2345678912345,
    publishedDate: '2026-02-10',
    pageCount: 132,
    authors: ['Jacques'],
    publisher: 'Booky',
    summary: 'Sed eu ipsum a magna sollicitudin aliquam vitae sodales risus. Praesent facilisis, felis malesuada porttitor imperdiet, purus magna egestas tellus, id maximus velit metus sed orci. Pellentesque sit amet varius eros. Nulla facilisi. Proin ornare feugiat metus, varius feugiat orci ullamcorper sed. Nullam tempor sapien in viverra commodo. Vivamus scelerisque, orci sed lobortis pellentesque, urna neque faucibus justo, a aliquet nibh nisi congue mauris. Donec dui orci, porta at nisi sit amet, tempor venenatis neque. Maecenas ut sapien dolor. Aliquam ut sagittis sem. Proin ullamcorper lectus ipsum, blandit suscipit lacus volutpat at. Vestibulum sollicitudin magna sed diam tincidunt ultricies.',
    cover: require('@/assets/images/dummy/categories/Academic-Book-Cover-Template-edit-online.png'),
    tags: [{ id: 'tag#2', name: 'Romantique' }, { id: 'tag#1', name: 'Manga' }],
    status: {
      id: 'status#1',
      name: '',
      order: 0,
    },
    user: {
      id: 'user#1',
      name: 'Bob Eagle',
      email: 'bob.eagle@mail.com',
    }
  },
  {
    id: 'book#3',
    title: 'American',
    isbn: 3456789123456,
    publishedDate: '2026-02-10',
    pageCount: 50,
    authors: ['Paul'],
    publisher: '',
    summary: 'Integer sollicitudin ante et fermentum pellentesque. Maecenas accumsan at augue fringilla interdum. Curabitur eget purus sit amet nisi elementum placerat et non massa. Morbi sodales nibh ac felis imperdiet euismod. Aliquam id tincidunt purus, et blandit turpis. Mauris eget luctus magna. Ut mattis tempus ipsum, in ullamcorper justo tempor ultricies. Donec sem lorem, dictum in volutpat ut, euismod et elit.',
    cover: require('@/assets/images/dummy/categories/Book-Cover-for-Kids-Template-edit-online.png'),
    tags: [],
    status: {
      id: 'status#1',
      name: 'whishlist',
      order: 0,
    },
    user: {
      id: 'user#1',
      name: 'Bob Eagle',
      email: 'bob.eagle@mail.com',
    }
  },
  {
    id: 'book#4',
    title: 'Chicken',
    isbn: 4567891234567,
    publishedDate: '2026-02-10',
    pageCount: 458,
    authors: ['Pierre'],
    publisher: '',
    summary: 'Mauris nec ex quis leo consequat hendrerit. Suspendisse potenti. Quisque faucibus mauris justo, id gravida diam sollicitudin vel. Suspendisse euismod et neque sit amet lobortis. Vestibulum vel elementum massa. Nulla facilisi. Integer blandit iaculis magna, nec hendrerit dolor congue ut. Aenean imperdiet urna sed elementum auctor. Proin quis sem finibus, tincidunt dolor cursus, vehicula odio. Sed lacinia mollis purus sit amet ornare. Sed tincidunt elementum turpis, quis malesuada erat eleifend at. Vestibulum semper sem ut dui sagittis, eu finibus massa consectetur. Aenean sit amet commodo sem, vitae consectetur augue. Cras accumsan, odio sit amet pulvinar scelerisque, nisi justo consequat turpis, sed vulputate nunc ligula sed eros.',
    cover: require('@/assets/images/dummy/categories/Comic-Book-Cover-Template-edit-online.png'),
    tags: [],
    status: {
      id: 'status#2',
      name: 'to read',
      order: 1,
    },
    user: {
      id: 'user#1',
      name: 'Bob Eagle',
      email: 'bob.eagle@mail.com',
    }
  },
  {
    id: 'book#5',
    title: 'Pizza',
    isbn: 5678912345678,
    publishedDate: '2026-02-10',
    pageCount: 956,
    authors: ['Jeanne', 'Jeannette'],
    publisher: 'Ducard',
    summary: 'Nunc ut est et est dapibus pulvinar nec in mauris. Donec vitae mi viverra, pulvinar ligula vel, feugiat magna. Quisque luctus metus nec diam faucibus, eu mollis ipsum feugiat. Etiam ac ante lobortis, varius ipsum eget, interdum mi. Ut accumsan ipsum in ipsum sagittis semper. Maecenas sed enim pretium orci vulputate finibus. Fusce porta imperdiet purus, at facilisis erat accumsan eu. Donec at ultrices erat, eu interdum elit. Phasellus sodales, est in sollicitudin lobortis, nunc magna sodales lectus, ut lobortis magna enim quis purus. Curabitur rutrum faucibus velit sit amet sagittis. Phasellus rutrum nulla ac augue vehicula, quis luctus turpis dapibus. Ut auctor congue ex a vehicula. Nulla dui libero, interdum eu sapien non, sollicitudin suscipit dui.',
    cover: require('@/assets/images/dummy/categories/Miniature-Book-Cover-Template-edit-online.png'),
    tags: [{ id: 'tag#2', name: 'Romantique' }, { id: 'tag#1', name: 'Manga' }, { id: 'tag#3', name: 'Historique' }],
    status: {
      id: 'status#5',
      name: 'abandoned',
      order: 4,
    },
    user: {
      id: 'user#1',
      name: 'Bob Eagle',
      email: 'bob.eagle@mail.com',
    }
  },
];
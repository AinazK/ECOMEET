import { Component } from '@angular/core';
import { Navigation } from '../../components/navigation/navigation';
import { CommonModule } from '@angular/common';

interface VkEvent {
  name: string;
  currentAmount: number;
  goalAmount: number;
  descriptions: string;
  url: string;
  isOpen: boolean;
  photo: number[];
  do: string;
}

@Component({
  selector: 'app-vk',
  imports: [Navigation, CommonModule],
  templateUrl: './vk.html',
  styleUrls: ['./vk.scss'],
})
export class Vk {
  vkEvents: VkEvent[] = [
    {
      name: 'Вторая жизнь вещей',
      currentAmount: 50164,
      goalAmount: 450000,
      descriptions:
        '«Это не просто вещи» — единственный в Приморье проект, который принимает у жителей края ненужную одежду и отправляет её в семьи, которым нужна помощь. Негодные вещи активисты утилизируют. Мы собираем деньги, чтобы эта важная работа продолжалась.',
      isOpen: false,
      url: 'https://dobro.mail.ru/projects/eto-ne-prosto-veschi/',
      photo: [1.1, 1.2, 1.3],
      do: 'доставим одежду и оплатим работу склада',
    },
    {
      name: 'Детям — экознания, <br/> экоспикерам — призы',
      currentAmount: 4318,
      goalAmount: 35000,
      descriptions:
        '«Я начинал помогать природе с субботников. А потом понял, что важно заниматься экопросвещением детей», — делится один из экоспикеров проекта «О, да, вторсырье!» Алексей Самарский. Вместе с коллегами он проводит такие занятия безвозмездно и на энтузиазме. Фонд «Мусора.Больше.Нет» хочет поблагодарить тех, кто помогает растить новое поколение экологически ответственных людей. Мы собираем деньги на призы для экоспикеров. Давайте поддержим их важный труд!',
      isOpen: false,
      url: 'https://dobro.mail.ru/projects/detyam-ekoznaniya-ekospikeram-prizyi/',
      photo: [2.1, 2.2, 2.3],
      do: 'Поможем купить призы для тех, кто занимается экопросвещением детей',
    },
    {
      name: '«Жить в красоте»:<br/> защитим Байкал от мусора',
      currentAmount: 1000,
      goalAmount: 300000,
      descriptions:
        '«Байкал — наша национальная гордость», — говорит почти каждый россиянин. Но как защищать его, если живешь за тысячи километров от озера? Решение есть — поддержать акции «Экодесанта». Это благотворительный проект по сбору и переработке вторсырья. Мы собираем деньги на транспорт для вывоза мусора, доставку, проживание и питание волонтеров, а также оплату работы координаторов. Пусть самое глубокое озеро в мире остается чистым!',
      isOpen: false,
      url: 'https://dobro.mail.ru/projects/zaschitim-bajkal-ot-musora-2/',
      photo: [3.1, 3.2, 3.3],
      do: 'Поможем оплатить программу сбора вторсырья',
    },
    {
      name: 'Поможем многим — быстро и эффективно',
      currentAmount: 376397,
      goalAmount: 1000000,
      descriptions:
        'Мы собираем деньги на поддержку системных проектов честных благотворительных фондов — то есть таких, которые решают масштабные социальные проблемы по всей стране. Давайте вместе помогать детям, взрослым и животным, проектам в области науки и культуры.',
      isOpen: false,
      url: 'https://dobro.mail.ru/projects/pust-pomosch-prihodit-vovremya/',
      photo: [4.1],
      do: 'поддержим системные проекты помощи.',
    },
  ];

  progress(event: VkEvent): number {
    return (event.currentAmount / event.goalAmount) * 100;
  }
  toggleArrow(event: VkEvent) {
    event.isOpen = !event.isOpen;
  }
}

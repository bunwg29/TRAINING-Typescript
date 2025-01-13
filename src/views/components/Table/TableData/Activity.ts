import { ActivityHeaderConfig } from '@/types/Content';
import { activityType } from '@/types/UserResponse';
import { DOM } from '@/views/utils/DOM';

export class Activity {
  private readonly dom: DOM;
  private readonly headerConfig: ActivityHeaderConfig = {
    titles: ['DATE', 'USER ACTIVITY', 'DETAIL'],
  };

  constructor() {
    this.dom = new DOM();
  }

  private createHeaderTitle(title: string): HTMLElement {
    const titleElement = this.dom.div('activity-header-title');
    titleElement.textContent = title;
    return titleElement;
  }

  private createHeader(): HTMLElement {
    const headerElement = this.dom.div('activity-header');
    const headerTitles = this.headerConfig.titles.map(title =>
      this.createHeaderTitle(title),
    );

    headerElement.append(...headerTitles);
    return headerElement;
  }

  private createActivityInfo(activity: activityType): HTMLElement {
    const infoElement = this.dom.div('activity-info');

    const dateElement = this.dom.div('activity-date');
    dateElement.textContent = activity.date;

    const descriptionElement = this.dom.div('activity-description');
    descriptionElement.textContent = activity.user_activity;

    const detailElement = this.dom.div('activity-detail');
    detailElement.textContent = activity.detail;

    infoElement.append(dateElement, descriptionElement, detailElement);
    return infoElement;
  }

  private createActivityContent(activities: activityType[]): HTMLElement {
    const containerElement = this.dom.div('activity');

    containerElement.append(this.createHeader());

    const activityElements = activities.map(activity =>
      this.createActivityInfo(activity),
    );

    containerElement.append(...activityElements);
    return containerElement;
  }

  public render(activities: activityType[]): HTMLElement {
    return this.createActivityContent(activities);
  }
}

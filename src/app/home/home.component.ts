import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class HomeComponent implements AfterViewInit{

  isHomePage: boolean;
  constructor(private router: Router, private cd: ChangeDetectorRef) {
    this.isHomePage = router.url == '/';
    router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        this.isHomePage = e.url == '/';
      }
    });
  }

  @ViewChild("main")
  main?: ElementRef<HTMLElement>;

  ngAfterViewInit() {
      this.onResize();
      this.cd.detectChanges();
  }

  footerAtTheBottom: boolean = true;
  shouldBeRounded: boolean = true;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.footerAtTheBottom = this.main!.nativeElement.offsetHeight + 169 <= document.body.offsetHeight;
    this.shouldBeRounded = this.main!.nativeElement.offsetHeight + 10 <= document.body.offsetHeight;
  }

  onResizeTimeout() {
    setTimeout(()=>this.onResize(), 100);
    setTimeout(()=>this.onResize(), 300);
    setTimeout(()=>this.onResize(), 40);
  }
}

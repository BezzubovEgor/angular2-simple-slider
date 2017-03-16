import { Component, ElementRef, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { SliderState } from './slider.state';

@Component({
    selector: 'slider',
    template: `
        <div #simpleSlider class="slider"  (window:mouseup)="mouseup($event)" value="hello">
            <div class="line">
                <div class="colorline" [style.width.px]="offsetXRealFirst" ></div>
                <div class="colorline line-right" [style.width.px]="offsetXRealSecond"></div>
                <div class="circle" 
                    [style.left.px]="offsetXRealFirst" 
                    (mousedown)="mousedownFirst($event)"
                    (window:mousemove)="mousemoveFirst($event)"></div>
                <div class="circle" 
                    [style.right.px]="offsetXRealSecond" 
                    (mousedown)="mousedownSecond($event)"
                    (window:mousemove)="mousemoveSecond($event)"></div>
            </div>
        </div>
    `,
    styles: [`
        .slider {
            user-select: none;
            position: relative;
            width: 100%;
            height: 16px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .slider .line {
            width: 100%;
            height: 2px;
            background: #3F3CCB;
        }
            .slider .line .colorline {
                position: absolute;
                height: 2px;
                left: 0px;
                background: #CCC;
            }
            .slider .line .colorline.line-right {
                position: absolute;
                left: initial;
                right: 0px;
            }
            .slider .line .circle {
                position: absolute;
                border-radius: 100%;
                height: 16px;
                width: 16px;
                top: 0px;
            }
            .slider .line .circle:before {
                position: absolute;
                content: "";
                width: 16px;
                height: 16px;
                top: 0px;
                left: 0px;
                border-radius: 100%;
                box-shadow: inset 0px 0px 0px 2px #CCC;
                transition: all 0.4s;
                background: white;
            }
            
            .slider .line .circle:active:before,
            .slider .line .circle:hover:before {
                box-shadow: none;
                width: 18px;
                height: 18px;
                top: -1px;
                left: -1px;
                background: #3F3CCB;
            }
    `]
})
export class SliderComponent implements OnInit {
    @Input()
    public maxValue = 100;
    @Input()
    public minValue = 0;

    private offsetXRealFirst = 0;
    private offsetXFirst = 0;
    private offsetXRealSecond = 0;
    private offsetXSecond = 0;
    private isMousedownSecond = false;
    private isMousedownFirst = false;

    //values percentage
    private firstVal = 0;
    private secondVal = 1;

    //margin of circle
    private margin = 0;

    // private sliderElement: any;

    @Output()
    public change = new EventEmitter();

    @ViewChild('simpleSlider')
    private sliderElement: any

    constructor() { }

    public ngOnInit() {
        console.log(this.sliderElement);
        this.margin = this.sliderElement.nativeElement.querySelector('.circle').offsetWidth / 2;
        this.offsetXRealFirst = this.offsetXFirst = this.offsetXRealSecond = this.offsetXSecond = -this.margin;
    }

    public mousedownFirst(event: any) {
        this.isMousedownFirst = true;
    }

    public mousedownSecond(event: any) {
        this.isMousedownSecond = true;
    }

    public mouseup(event: any) {
        this.isMousedownFirst = false;
        this.isMousedownSecond = false;
        if (this.offsetXFirst < -this.margin) {
            this.offsetXFirst = -this.margin;
        }
        if (this.offsetXSecond < -this.margin) {
            this.offsetXSecond = -this.margin;
        }
    }

    public mousemoveFirst(event: any) {
        if (this.isMousedownFirst) {
            this.offsetXFirst += event.movementX;
            if (this.offsetXFirst >= -this.margin && this.offsetXFirst <= this.sliderElement.nativeElement.offsetWidth - this.margin) {
                this.offsetXRealFirst = this.offsetXFirst;
                this.firstVal = (this.offsetXFirst + this.margin) / (this.sliderElement.nativeElement.offsetWidth);
                this.emitChanges();
            }
        }
    }

    public mousemoveSecond(event: any) {
        
        if (this.isMousedownSecond) {
            this.offsetXSecond += -event.movementX;
            if (this.offsetXSecond >= -this.margin && this.offsetXSecond <= this.sliderElement.nativeElement.offsetWidth - this.margin) {
                this.offsetXRealSecond = this.offsetXSecond;
                this.secondVal = 1 - (this.offsetXSecond + this.margin) / (this.sliderElement.nativeElement.offsetWidth);
                this.emitChanges();
            }
        }
    }

    public emitChanges() {
        this.change.emit({
            firstVal: this.getMinVal(),
            secondVal: this.getMaxVal()
        });
    }

    private getMaxMinDiff(): number {
        return this.maxValue - this.minValue;
    }

    private getMinVal(): number {
        return this.minValue + this.getMaxMinDiff() * this.firstVal;
    }

    private getMaxVal(): number {
        return this.minValue + this.getMaxMinDiff() * this.secondVal;
    }
}

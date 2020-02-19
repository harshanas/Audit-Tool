import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-evidence-history',
  templateUrl: './view-evidence-history.component.html',
  styleUrls: ['./view-evidence-history.component.scss']
})
export class ViewEvidenceHistoryComponent implements OnInit {

  constructor(
    // private evidenceApiService: EvidenceApiService,
    private route: ActivatedRoute,
    ) { }

  // evidences: any[];
  sub: any;
  productId: number;
  questionId: number;

  async ngOnInit() {
    this.sub = this.route.params.subscribe(async params => {
      this.productId = +params['product-id'];
      this.questionId = +params['question-id'];
    });
    // this.evidences = await this.evidenceApiService.getEvidenceVersions(this.productId, this.questionId);
  }

}

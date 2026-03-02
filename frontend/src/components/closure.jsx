import React from "react";

function Closure() {
  return (
    <div className="d-flex flex-column align-items-center py-4">

      {/* Step instruction block */}
      <div className="w-100 mb-4" style={{ maxWidth: '720px' }}>
        <div style={{
          borderLeft: '4px solid #2d7aaa',
          background: 'rgba(45,122,170,0.06)',
          borderRadius: '0 8px 8px 0',
          padding: '16px 20px',
        }}>
          <p style={{ margin: 0, marginBottom: '12px', color: '#0d2d4a', fontSize: '15px', fontWeight: '700', lineHeight: 1.5 }}>
            2.3 Agree on the reform teams that will be tasked with developing and implementing plans to address bottlenecks.
          </p>
          <p style={{ margin: 0, marginBottom: '10px', color: '#1a3a52', fontSize: '14px', lineHeight: 1.7 }}>
            Finally, identify stakeholders that are critical for addressing the agreed bottlenecks, conducting stakeholder analysis to understand their interests and influence over the reform and use this initial analysis to identify and agree the members of reform teams tasked with addressing related bottlenecks. It may be appropriate for a reform team to handle groups of more than one bottleneck.
          </p>
        </div>
      </div>

      {/* Content block */}
      <div className="w-100" style={{ maxWidth: '720px' }}>
        <div style={{
          background: '#fff',
          border: '1px solid #b8d9ee',
          borderRadius: '8px',
          padding: '20px 24px',
        }}>
          <p style={{ fontSize: '13px', color: '#1a3a52', lineHeight: 1.8, margin: '0 0 12px 0' }}>
            This marks the end of the diagnostic phase, in which applying the outcome-led diagnostic approach provides a limited set of prioritized PFM bottlenecks which can form the basis of reform design. The convenor team can compile the bottlenecks analysis into a report which details the public sector challenges that the government faces, the roles that public finance plays, the key, prioritized bottlenecks that exist, and the stakeholders involved.
          </p>
          <p style={{ fontSize: '13px', color: '#1a3a52', lineHeight: 1.8, margin: '0 0 12px 0' }}>
            The prioritized bottlenecks should then be endorsed by the relevant reform authorizers, who should also provide the approval required to move to the next step of the process, including the formation of reform teams for each of the bottlenecks.
          </p>
          <p style={{ fontSize: '13px', color: '#1a3a52', lineHeight: 1.8, margin: 0 }}>
            Note that whilst background analytical work can inform this process, validation of the roles and bottlenecks, prioritization and stakeholder identification is best done collectively. This can be done in a workshop-style environment so that all stakeholders (including those from the point of delivery and at the local level) can collaboratively obtain agreement on the priority bottlenecks.
          </p>
        </div>
      </div>

    </div>
  );
}

export default Closure;

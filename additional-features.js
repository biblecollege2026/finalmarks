// Bible College of India - Professional Branding with Dual Signatures & Ranking
// UPDATED: University-grade marksheet, A4-safe, print-color-exact, professional navy+gold theme
(function () {
    'use strict';

    if (typeof STUDENT_DATA === 'undefined') {
        console.error('STUDENT_DATA is not defined. Make sure student-data.js is loaded first.');
        return;
    }

    // ─────────────────────────────────────────────────────────────────────
    // 1. INITIALIZATION
    // ─────────────────────────────────────────────────────────────────────
    function init() {
        setTimeout(() => {
            if (window.studentEmail === 'jlibiblecollege@gmail.com' &&
                document.getElementById('adminDashboard')) {
                if (document.getElementById('adminDashboard').style.display !== 'block') {
                    window.showAdminDashboard();
                }
            }
        }, 500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ─────────────────────────────────────────────────────────────────────
    // 2. HEADER BUTTONS
    // ─────────────────────────────────────────────────────────────────────
    window.addAdditionalButtons = function () {
        const studentInfo = document.querySelector('.student-info');
        if (!studentInfo || document.getElementById('marksheetBtn')) return;

        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'header-actions';
        buttonsContainer.style.cssText = 'display:flex;gap:10px;align-items:center;flex-wrap:wrap;';

        const profileBtn = createButton('profileBtn', '👤 Student Profile', '#667eea', '#764ba2');
        profileBtn.onclick = () => window.showStudentProfile(window.studentEmail);

        const marksheetBtn = createButton('marksheetBtn', '📊 View Marksheet', '#f093fb', '#f5576c');
        marksheetBtn.onclick = () => window.showMarksheet(window.studentEmail);

        buttonsContainer.appendChild(profileBtn);
        buttonsContainer.appendChild(marksheetBtn);

        const logoutBtn = studentInfo.querySelector('.logout-btn');
        if (logoutBtn) studentInfo.insertBefore(buttonsContainer, logoutBtn);
        else studentInfo.appendChild(buttonsContainer);
    };

    function createButton(id, text, color1, color2) {
        const btn = document.createElement('button');
        btn.id = id;
        btn.innerHTML = text;
        btn.style.cssText = `
            padding:10px 20px;
            background:linear-gradient(135deg,${color1} 0%,${color2} 100%);
            color:white;border:none;border-radius:8px;cursor:pointer;
            font-size:0.9em;font-weight:600;transition:all 0.3s;
            text-transform:uppercase;letter-spacing:0.5px;white-space:nowrap;
        `;
        return btn;
    }

    // ─────────────────────────────────────────────────────────────────────
    // 3. SHOW MARKSHEET
    // ─────────────────────────────────────────────────────────────────────
    window.showMarksheet = function (email) {
        if (!email) return;
        const studentMarksData   = STUDENT_DATA.marks[email];
        const studentProfileData = STUDENT_DATA.profiles[email];

        if (!studentMarksData) { alert('No marksheet data available.'); return; }

        window.hideAllContentSections();

        let marksheetSection = document.getElementById('marksheetSection');
        if (!marksheetSection) {
            marksheetSection = createMarksheetSection();
            document.querySelector('.container').appendChild(marksheetSection);
        }

        populateMarksheet(studentMarksData, studentProfileData, email);
        marksheetSection.style.display = 'block';
    };

    // ─────────────────────────────────────────────────────────────────────
    // 4. SHOW STUDENT PROFILE  (unchanged from original)
    // ─────────────────────────────────────────────────────────────────────
    window.showStudentProfile = function (email) {
        const data = STUDENT_DATA.profiles[email];
        if (!data) return;
        window.hideAllContentSections();

        let section = document.getElementById('profileSection');
        if (!section) {
            section = document.createElement('div');
            section.id = 'profileSection';
            section.style.cssText = 'padding:20px;display:none;';
            document.querySelector('.container').appendChild(section);
        }

        section.innerHTML = `
            <div style="max-width:1000px;margin:0 auto;">
                <button onclick="window.backToDashboardFromProfile()"
                    style="padding:10px 20px;background:#6c757d;color:white;border:none;
                           border-radius:5px;cursor:pointer;margin-bottom:20px;font-weight:bold;">
                    ⬅ BACK TO DASHBOARD
                </button>

                <!-- In the marksheet header, replace or update the title area -->
              <div style="text-align: center; padding: 20px 0 10px 0;">
           <img 
        src="https://raw.githubusercontent.com/sam411042/finalmarks/main/logogbibleclllege.jpeg" 
        alt="Bible College of India Logo"
        style="width: 100px; height: 100px; object-fit: contain; margin-bottom: 10px;"
        onerror="this.style.display='none'"
               />


                <div style="text-align:center;margin-bottom:25px;border-bottom:2px solid #eee;padding-bottom:20px;">
                    <h1 style="margin:0;font-size:2.2em;color:#1e3c72;font-family:'Arial Black',Gadget,sans-serif;
                               text-transform:uppercase;line-height:1.2;">
                        BIBLE COLLEGE OF INDIA PASTORS FOUNDATION
                    </h1>
                    <p style="margin:8px 0 0 0;font-size:1em;color:#555;font-weight:600;">
                        (AFFILIATED TO JESUS LOVES INDIA CHURCH FOUNDATION)
                    </p>
                </div>

                <div style="background:#00aeef;color:white;padding:30px 20px;text-align:center;
                            border-radius:15px;margin-bottom:30px;box-shadow:0 4px 15px rgba(0,0,0,0.1);">
                    <div style="font-size:3em;margin-bottom:10px;">👤</div>
                    <h2 style="margin:0;font-size:2.2em;font-family:'Times New Roman',serif;">Student Profile</h2>
                    <h3 style="margin:15px 0 5px 0;font-weight:normal;font-size:1.6em;">${data.name}</h3>
                    <p style="margin:0;opacity:0.9;font-size:1.1em;">${email}</p>
                </div>

                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));
                            gap:30px;margin-bottom:30px;">
                    <div style="background:white;padding:25px;border-radius:12px;
                                border-left:10px solid #4caf50;box-shadow:0 5px 15px rgba(0,0,0,0.08);">
                        <h3 style="color:#1e3c72;margin-top:0;border-bottom:2px solid #eee;
                                   padding-bottom:15px;font-size:1.5em;">Personal Information</h3>
                        <div style="line-height:2.5;font-size:1.05em;">
                            <p>📍 <strong>Address:</strong>   <span style="float:right;">${data.address}</span></p>
                            <p>📱 <strong>Mobile:</strong>    <span style="float:right;">${data.mobile}</span></p>
                            <p>📅 <strong>DOB:</strong>       <span style="float:right;">${data.dob || 'N/A'}</span></p>
                            <p>🔢 <strong>Age:</strong>       <span style="float:right;">${data.age || 'N/A'}</span></p>
                            <p>⚧  <strong>Gender:</strong>   <span style="float:right;">${data.gender || 'N/A'}</span></p>
                            <p>🎓 <strong>Education:</strong> <span style="float:right;">${data.education || 'N/A'}</span></p>
                        </div>
                    </div>
                    <div style="background:white;padding:25px;border-radius:12px;
                                border-left:10px solid #ff9800;box-shadow:0 5px 15px rgba(0,0,0,0.08);">
                        <h3 style="color:#1e3c72;margin-top:0;border-bottom:2px solid #eee;
                                   padding-bottom:15px;font-size:1.5em;">Church Information</h3>
                        <div style="line-height:2.5;font-size:1.05em;">
                            <p>⛪ <strong>Church:</strong>  <span style="float:right;">${data.church}</span></p>
                            <p>👨‍💼 <strong>Pastor:</strong> <span style="float:right;">${data.pastor}</span></p>
                            <p>👤 <strong>Ref 1:</strong>   <span style="float:right;">${data.reference1 || 'N/A'}</span></p>
                            <p>👤 <strong>Ref 2:</strong>   <span style="float:right;">${data.reference2 || 'N/A'}</span></p>
                        </div>
                    </div>
                </div>

                <div style="background:white;padding:25px;border-radius:12px;
                            border-left:10px solid #9c27b0;box-shadow:0 5px 15px rgba(0,0,0,0.08);
                            width:100%;margin-bottom:30px;">
                    <h3 style="color:#1e3c72;margin-top:0;font-size:1.5em;">
                        Your Future plan for god's work / देवाच्या कार्यासाठी तुमची भविष्यातील योजना
                    </h3>
                    <hr style="border:0;border-top:1px solid #eee;margin:15px 0;">
                    <p style="font-size:1.1em;color:#444;white-space:pre-wrap;line-height:1.6;">
                        ${data.futurePlan || 'No information provided.'}
                    </p>
                </div>
            </div>
        `;
        section.style.display = 'block';
    };

    // ─────────────────────────────────────────────────────────────────────
    // 5. DOWNLOAD MARKSHEET  — scale:3, pagebreak avoid-all, A4 tight margin
    // ─────────────────────────────────────────────────────────────────────
    window.downloadMarksheet = function () {
        const element = document.getElementById('marksheet-to-print');
        const name    = document.getElementById('marksheet-student-name').textContent.trim();
        const btn     = document.getElementById('downloadBtn');
        btn.innerText = '⌛ Processing...';
        btn.disabled  = true;

        const opt = {
            margin:      [8, 8, 8, 8],
            filename:    `Marksheet_${name}.pdf`,
            image:       { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale:           3,
                useCORS:         true,
                allowTaint:      true,
                logging:         false,
                letterRendering: true,
            },
            jsPDF: {
                unit:        'mm',
                format:      'a4',
                orientation: 'portrait',
                compress:    true,
            },
            pagebreak: { mode: 'avoid-all' },
        };

        html2pdf().set(opt).from(element).save().then(() => {
            btn.innerText = '📥 DOWNLOAD PDF';
            btn.disabled  = false;
        });
    };

    // ─────────────────────────────────────────────────────────────────────
    // 6. NAVIGATION HELPERS
    // ─────────────────────────────────────────────────────────────────────
    window.backToDashboardFromMarksheet = function () {
        document.getElementById('marksheetSection').style.display = 'none';
        if (window.studentEmail === 'jlibiblecollege@gmail.com') window.showAdminDashboard();
        else document.getElementById('pdfSelection').style.display = 'block';
    };

    window.backToDashboardFromProfile = function () {
        document.getElementById('profileSection').style.display = 'none';
        if (window.studentEmail === 'jlibiblecollege@gmail.com') window.showAdminDashboard();
        else document.getElementById('pdfSelection').style.display = 'block';
    };

    // ─────────────────────────────────────────────────────────────────────
    // 7. ADMIN DASHBOARD  (unchanged from original)
    // ─────────────────────────────────────────────────────────────────────
    window.showAdminDashboard = function () {
        window.hideAllContentSections();
        const dash = document.getElementById('adminDashboard');
        if (!dash) return;
        dash.style.display = 'block';

        const list = document.getElementById('studentList');
        list.innerHTML = '';

        Object.keys(STUDENT_DATA.profiles)
            .filter(e => e !== 'jlibiblecollege@gmail.com')
            .forEach(email => {
                const p    = STUDENT_DATA.profiles[email];
                const card = document.createElement('div');
                card.style.cssText = `
                    background:white;padding:20px;margin-bottom:15px;
                    border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.08);
                    display:flex;flex-direction:column;align-items:center;
                    text-align:center;border:1px solid #eee;
                `;
                card.innerHTML = `
                    <div style="margin-bottom:15px;">
                        <strong style="font-size:1.1em;color:#1e3c72;display:block;margin-bottom:2px;">
                            ${p.name}
                        </strong>
                        <small style="color:#666;font-size:0.85em;">${email}</small>
                    </div>
                    <div style="display:flex;flex-direction:column;gap:8px;width:100%;max-width:160px;">
                        <button onclick="window.showStudentProfile('${email}')"
                            style="width:100%;padding:10px;background:#2196f3;color:white;border:none;
                                   border-radius:6px;cursor:pointer;font-weight:700;font-size:0.85em;
                                   letter-spacing:0.5px;">PROFILE</button>
                        <button onclick="window.showMarksheet('${email}')"
                            style="width:100%;padding:10px;background:#f5576c;color:white;border:none;
                                   border-radius:6px;cursor:pointer;font-weight:700;font-size:0.85em;
                                   letter-spacing:0.5px;">MARKSHEET</button>
                    </div>
                `;
                list.appendChild(card);
            });
    };

    // ═════════════════════════════════════════════════════════════════════
    // 8. CREATE MARKSHEET SECTION  — university-grade, A4-safe, navy + gold
    // ═════════════════════════════════════════════════════════════════════
    function createMarksheetSection() {
        const section = document.createElement('div');
        section.id = 'marksheetSection';
        section.style.cssText = 'padding:10px;background:#e8e8e8;display:none;';

        section.innerHTML = `
            <!-- action bar -->
            <div style="display:flex;justify-content:space-between;align-items:center;
                        margin-bottom:12px;gap:8px;flex-wrap:wrap;">
                <button onclick="window.backToDashboardFromMarksheet()"
                    style="padding:9px 18px;background:#455a64;color:white;border:none;
                           border-radius:8px;cursor:pointer;font-weight:700;font-size:13px;">
                    ⬅ BACK
                </button>
                <button id="downloadBtn" onclick="window.downloadMarksheet()"
                    style="padding:9px 18px;background:#1b5e20;color:white;border:none;
                           border-radius:8px;cursor:pointer;font-weight:700;font-size:13px;">
                    📥 DOWNLOAD PDF
                </button>
            </div>

            <!-- ══════════ PRINTABLE A4 SHEET ══════════ -->
            <div id="marksheet-to-print" style="
                background:#fffdf5;
                width:100%;max-width:794px;
                margin:0 auto;
                padding:12mm 14mm 10mm 14mm;
                box-sizing:border-box;
                border-radius:6px;
                box-shadow:0 6px 28px rgba(0,0,0,0.22);
                font-family:'Georgia','Times New Roman',serif;
                font-size:9pt;
                position:relative;
                overflow:hidden;
                -webkit-print-color-adjust:exact;
                print-color-adjust:exact;
            ">
                <!-- decorative double border -->
                <div style="position:absolute;top:5px;left:5px;right:5px;bottom:5px;
                            border:3px double #1a237e;border-radius:4px;pointer-events:none;z-index:0;
                            -webkit-print-color-adjust:exact;print-color-adjust:exact;"></div>
                <div style="position:absolute;top:10px;left:10px;right:10px;bottom:10px;
                            border:1px solid #c8a951;border-radius:3px;pointer-events:none;z-index:0;
                            -webkit-print-color-adjust:exact;print-color-adjust:exact;"></div>

                <!-- cross watermark -->
                <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
                            font-size:160px;opacity:0.04;color:#1a237e;pointer-events:none;
                            z-index:0;user-select:none;font-weight:900;line-height:1;
                            -webkit-print-color-adjust:exact;print-color-adjust:exact;">✝</div>

                <!-- all content above watermark -->
                <div style="position:relative;z-index:1;">

                    <!-- COLLEGE HEADER -->
                    <div style="text-align:center;padding-bottom:6px;margin-bottom:6px;
                                border-bottom:3px double #1a237e;">
                        <div style="height:2.5px;
                                    background:linear-gradient(90deg,transparent,#c8a951,transparent);
                                    margin-bottom:6px;
                                    -webkit-print-color-adjust:exact;print-color-adjust:exact;"></div>
                        <div style="font-size:15pt;font-weight:900;color:#1a237e;text-transform:uppercase;
                                    letter-spacing:1.5px;font-family:'Arial Black',Arial,sans-serif;line-height:1.2;">
                            Bible College of India Pastors Foundation
                        </div>
                        <div style="font-size:8pt;color:#5d4037;font-weight:600;margin-top:2px;
                                    font-family:Arial,sans-serif;letter-spacing:0.5px;">
                            (Affiliated to Jesus Loves India Church Foundation)
                        </div>
                        <div style="height:2px;
                                    background:linear-gradient(90deg,transparent,#c8a951,transparent);
                                    margin-top:6px;
                                    -webkit-print-color-adjust:exact;print-color-adjust:exact;"></div>
                    </div>

                    <!-- EXAM TITLE BANNER -->
                    <div style="
                        background:linear-gradient(135deg,#1a237e 0%,#283593 60%,#1565c0 100%);
                        color:white;padding:6px 14px;text-align:center;
                        border-top:2px solid #c8a951;border-bottom:2px solid #c8a951;
                        margin-bottom:6px;
                        -webkit-print-color-adjust:exact;print-color-adjust:exact;
                    ">
                        <div id="rank-badge-container" style="margin-bottom:2px;"></div>
                        <div style="font-size:7.5pt;font-weight:900;text-transform:uppercase;
                                    letter-spacing:1.2px;color:#ffd54f;font-family:Arial,sans-serif;">
                            Certificate in Theology (C.T.H) — 2025 Examination Result
                        </div>
                        <div id="marksheet-student-name"
                             style="font-size:13pt;font-weight:900;margin-top:2px;
                                    color:#ffffff;font-family:'Georgia',serif;letter-spacing:0.5px;">
                        </div>
                        <div id="marksheet-student-email-display"
                             style="font-size:7.5pt;opacity:0.82;margin-top:1px;
                                    color:#e3f2fd;font-family:Arial,sans-serif;">
                        </div>
                    </div>

                    <!-- SUMMARY CARDS -->
                    <table style="width:100%;border-collapse:separate;border-spacing:5px;
                                  margin-bottom:6px;table-layout:fixed;
                                  -webkit-print-color-adjust:exact;print-color-adjust:exact;">
                        <tr>
                            <td style="background:#1a237e;border:1.5px solid #c8a951;padding:5px 6px;
                                       border-radius:4px;text-align:center;
                                       -webkit-print-color-adjust:exact;print-color-adjust:exact;">
                                <div style="font-size:6.5pt;font-weight:700;color:#c8a951;
                                            text-transform:uppercase;letter-spacing:0.4px;
                                            font-family:Arial,sans-serif;">Total Online Exams</div>
                                <div id="online-exams-taken"
                                     style="font-size:14pt;font-weight:900;color:#ffffff;
                                            font-family:'Georgia',serif;line-height:1.1;margin-top:1px;">0/12</div>
                                <div style="font-size:6pt;color:#90caf9;font-family:Arial,sans-serif;
                                            margin-top:1px;">(OT:7 + NT:5)</div>
                            </td>
                            <td style="background:#fffde7;border:1.5px solid #1a237e;padding:5px 6px;
                                       border-radius:4px;text-align:center;
                                       -webkit-print-color-adjust:exact;print-color-adjust:exact;">
                                <div style="font-size:6.5pt;font-weight:700;color:#5d4037;
                                            text-transform:uppercase;letter-spacing:0.4px;
                                            font-family:Arial,sans-serif;">Old Testament %</div>
                                <div id="final-percentage-score"
                                     style="font-size:14pt;font-weight:900;color:#1a237e;
                                            font-family:'Georgia',serif;line-height:1.1;margin-top:1px;">0%</div>
                            </td>
                            <td style="background:#e8f5e9;border:1.5px solid #1a237e;padding:5px 6px;
                                       border-radius:4px;text-align:center;
                                       -webkit-print-color-adjust:exact;print-color-adjust:exact;">
                                <div style="font-size:6.5pt;font-weight:700;color:#5d4037;
                                            text-transform:uppercase;letter-spacing:0.4px;
                                            font-family:Arial,sans-serif;">New Testament %</div>
                                <div id="nt-percentage-score"
                                     style="font-size:14pt;font-weight:900;color:#2e7d32;
                                            font-family:'Georgia',serif;line-height:1.1;margin-top:1px;">Pending</div>
                            </td>
                            <td style="background:#1b5e20;border:1.5px solid #c8a951;padding:5px 6px;
                                       border-radius:4px;text-align:center;
                                       -webkit-print-color-adjust:exact;print-color-adjust:exact;">
                                <div style="font-size:6.5pt;font-weight:700;color:#c8a951;
                                            text-transform:uppercase;letter-spacing:0.4px;
                                            font-family:Arial,sans-serif;">Combined % &amp; Grade</div>
                                <div id="combined-percentage-score"
                                     style="font-size:14pt;font-weight:900;color:#ffffff;
                                            font-family:'Georgia',serif;line-height:1.1;margin-top:1px;">Pending</div>
                                <div id="final-grade-display"
                                     style="font-size:9pt;font-weight:900;color:#ffd54f;
                                            font-family:Arial,sans-serif;">—</div>
                            </td>
                        </tr>
                    </table>

                    <!-- MAIN RESULTS TABLE -->
                    <table style="width:100%;border-collapse:collapse;margin-bottom:6px;
                                  font-family:Arial,sans-serif;font-size:8.5pt;">
                        <thead>
                            <tr style="background:#1a237e;
                                       -webkit-print-color-adjust:exact;print-color-adjust:exact;">
                                <th style="padding:5px 7px;border:1.5px solid #c8a951;color:#ffd54f;
                                           font-size:8pt;text-align:left;width:40%;
                                           font-family:'Georgia',serif;letter-spacing:0.3px;">Examination</th>
                                <th style="padding:5px 7px;border:1.5px solid #c8a951;color:#ffd54f;
                                           font-size:8pt;width:13%;font-family:'Georgia',serif;">Marks</th>
                                <th style="padding:5px 7px;border:1.5px solid #c8a951;color:#ffd54f;
                                           font-size:8pt;width:12%;font-family:'Georgia',serif;">Out of</th>
                                <th style="padding:5px 7px;border:1.5px solid #c8a951;color:#ffd54f;
                                           font-size:8pt;width:11%;font-family:'Georgia',serif;">%</th>
                                <th style="padding:5px 7px;border:1.5px solid #c8a951;color:#ffd54f;
                                           font-size:8pt;width:24%;font-family:'Georgia',serif;">Performance</th>
                            </tr>
                        </thead>
                        <tbody id="main-table-body"></tbody>
                    </table>

                    <!-- SIGNATURES -->
                    <table style="width:100%;border-collapse:collapse;margin-top:5px;">
                        <tr>
                            <td style="text-align:center;width:50%;padding:3px 10px;vertical-align:bottom;">
                                <img src="sign with stamp.png"
                                     style="width:110px;height:auto;display:block;margin:0 auto 3px auto;
                                            -webkit-print-color-adjust:exact;print-color-adjust:exact;"
                                     onerror="this.style.display='none'">
                                <div style="width:150px;height:1.5px;background:#1a237e;
                                            margin:0 auto 3px auto;
                                            -webkit-print-color-adjust:exact;print-color-adjust:exact;"></div>
                                <div style="font-size:9pt;font-weight:700;color:#1a237e;
                                            font-family:'Georgia',serif;">Prabha Sadanand Amolik</div>
                                <div style="font-size:7.5pt;color:#555;font-family:Arial,sans-serif;
                                            text-transform:uppercase;letter-spacing:0.8px;margin-top:1px;">Director</div>
                            </td>
                            <td style="text-align:center;width:50%;padding:3px 10px;vertical-align:bottom;">
                                <img src="DIGITAL STAMP.jpeg"
                                     style="width:110px;height:auto;display:block;margin:0 auto 3px auto;
                                            -webkit-print-color-adjust:exact;print-color-adjust:exact;"
                                     onerror="this.style.display='none'">
                                <div style="width:150px;height:1.5px;background:#1a237e;
                                            margin:0 auto 3px auto;
                                            -webkit-print-color-adjust:exact;print-color-adjust:exact;"></div>
                                <div style="font-size:9pt;font-weight:700;color:#1a237e;
                                            font-family:'Georgia',serif;">Sadanand Shamrao Amolik</div>
                                <div style="font-size:7.5pt;color:#555;font-family:Arial,sans-serif;
                                            text-transform:uppercase;letter-spacing:0.8px;margin-top:1px;">Director</div>
                            </td>
                        </tr>
                    </table>

                    <!-- FOOTER RULE + TEXT -->
                    <div style="height:1.5px;
                                background:linear-gradient(90deg,transparent,#c8a951,transparent);
                                margin-top:7px;
                                -webkit-print-color-adjust:exact;print-color-adjust:exact;"></div>
                    <div style="text-align:center;font-size:7pt;color:#888;
                                font-family:Arial,sans-serif;margin-top:3px;letter-spacing:0.3px;">
                        Bible College of India Pastors Foundation &nbsp;|&nbsp;
                        This is a computer-generated document. &nbsp;|&nbsp;
                        Certificate in Theology (C.T.H) 2025
                    </div>

                </div><!-- /z-index wrapper -->
            </div><!-- /marksheet-to-print -->

            <style>
                @media print {
                    @page { size: A4 portrait; margin: 10mm 12mm; }
                    body * { visibility: hidden; }
                    #marksheet-to-print,
                    #marksheet-to-print * { visibility: visible; }
                    #marksheet-to-print {
                        position: fixed; top: 0; left: 0;
                        width: 100%; max-width: 100%;
                        box-shadow: none; border-radius: 0;
                        padding: 0; margin: 0;
                    }
                    * {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                }
            </style>
        `;
        return section;
    }

    // ═════════════════════════════════════════════════════════════════════
    // 9. POPULATE MARKSHEET
    // ═════════════════════════════════════════════════════════════════════
    function populateMarksheet(studentMarksData, studentProfileData, email) {

        const tableBody = document.getElementById('main-table-body');
        tableBody.innerHTML = '';

        const PCA = '-webkit-print-color-adjust:exact;print-color-adjust:exact;';
        const td  = (extra = '') => `padding:3px 6px;border:1px solid #c5c5c5;font-size:8.5pt;${extra}`;
        const tdc = (extra = '') => td(`text-align:center;${extra}`);

        // ── OT DATA ──────────────────────────────────────────────────────
        const otMarks   = studentMarksData.marks;
        const otOffline = studentMarksData.offlineMark;
        const otLabels  = STUDENT_DATA.examMonths;

        let otTotal = 0, otTaken = 0;

        tableBody.appendChild(makeSectionHeader(
            'Old Testament — 7 Online Examinations', '#1a237e', '#ffd54f'));

        otMarks.forEach((mark, i) => {
            if (mark !== null && typeof mark === 'number') { otTotal += mark; otTaken++; }
            tableBody.appendChild(makeExamRow(otLabels[i], mark, i, td, tdc, PCA, 'Absent'));
        });

        const otAvg   = (otTotal / 700) * 100;
        const otW20   = otAvg * 0.20;
        const otOff   = (typeof otOffline === 'number') ? otOffline : 0;
        const otW80   = otOff * 0.80;
        const otFinal = parseFloat((otW20 + otW80).toFixed(2));

        appendCompactSummary(tableBody, otTotal, 700, otAvg, otOff,
            otW20, otW80, otFinal, false,
            '#f5f0e8', '#ede8d8', '#fff8dc', 'OT Final Result', td, tdc, PCA);

        // ── NT DATA ──────────────────────────────────────────────────────
        const ntData    = (typeof STUDENT_DATA.ntMarks !== 'undefined')
                            ? STUDENT_DATA.ntMarks[email] : null;
        const ntMarks   = ntData ? ntData.marks   : [null, null, null, null, null];
        const ntOffline = ntData ? ntData.offlineMark : null;
        const ntLabels  = STUDENT_DATA.ntExamMonths;

        let ntTotal = 0, ntTaken = 0;
        const ntHasData = ntMarks.some(m => m !== null) || ntOffline !== null;

        tableBody.appendChild(makeSectionHeader(
            'New Testament — 5 Online Examinations', '#1b5e20', '#c8e6c9'));

        ntMarks.forEach((mark, i) => {
            if (mark !== null && typeof mark === 'number') { ntTotal += mark; ntTaken++; }
            tableBody.appendChild(makeExamRow(ntLabels[i], mark, i, td, tdc, PCA, 'Pending'));
        });

        const ntAvg   = (ntTotal / 500) * 100;
        const ntW20   = ntAvg * 0.20;
        const ntOff   = (typeof ntOffline === 'number') ? ntOffline : 0;
        const ntW80   = ntOff * 0.80;
        const ntFinal = parseFloat((ntW20 + ntW80).toFixed(2));

        appendCompactSummary(tableBody, ntTotal, 500, ntAvg, ntOff,
            ntW20, ntW80, ntFinal, !ntHasData,
            '#e8f5e9', '#d0ead2', '#c8e6c9', 'NT Final Result', td, tdc, PCA);

        // ── COMBINED RESULT ───────────────────────────────────────────────
        const ntReady  = ntHasData && ntOffline !== null;
        const combined = ntReady
            ? parseFloat(((otFinal + ntFinal) / 2).toFixed(2))
            : null;

        const combRow = document.createElement('tr');
        combRow.style.cssText = `${PCA}`;
        combRow.innerHTML = `
            <td style="${td()}background:#1a237e;color:#ffd54f;font-weight:900;font-size:9pt;
                        font-family:'Georgia',serif;${PCA}">
                Combined Final Result
                <span style="font-size:7pt;font-weight:400;opacity:0.85;display:block;">
                    (OT Final + NT Final) ÷ 2
                </span>
            </td>
            <td style="${tdc()}background:#1a237e;color:#ffffff;font-weight:900;${PCA}">
                ${combined !== null ? combined : 'NT Pending'}
            </td>
            <td style="${tdc()}background:#1a237e;color:#ffffff;font-weight:900;${PCA}">100</td>
            <td style="${tdc()}background:#1a237e;color:#ffd54f;font-weight:900;${PCA}">
                ${combined !== null ? combined + '%' : '—'}
            </td>
            <td style="${tdc()}background:#1a237e;color:#ffd54f;font-weight:900;font-size:10pt;${PCA}">
                ${combined !== null ? calculateGrade(combined) : 'NT Pending'}
            </td>
        `;
        tableBody.appendChild(combRow);

        // ── RANKING BADGE ─────────────────────────────────────────────────
        const allScores = Object.keys(STUDENT_DATA.marks).map(e => {
            const m   = STUDENT_DATA.marks[e];
            const avg = (m.marks.reduce((a, b) =>
                (typeof b === 'number' ? a + b : a), 0) / 700) * 100;
            const off = (typeof m.offlineMark === 'number') ? m.offlineMark : 0;
            return parseFloat(((avg * 0.20) + (off * 0.80)).toFixed(2));
        }).sort((a, b) => b - a);

        const rank          = allScores.indexOf(otFinal) + 1;
        const rankContainer = document.getElementById('rank-badge-container');
        rankContainer.innerHTML = '';

        if (rank > 0 && rank <= 5) {
            const medals = ['🥇', '🥈', '🥉', '🏅', '🏅'];
            const badge  = document.createElement('div');
            badge.style.cssText = `
                display:inline-flex;align-items:center;gap:5px;
                background:#c8a951;color:#1a237e;
                padding:2px 14px;border-radius:20px;
                font-weight:900;font-size:8pt;
                border:1.5px solid #fff;
                font-family:Arial,sans-serif;letter-spacing:0.5px;
                text-transform:uppercase;margin-bottom:3px;
                -webkit-print-color-adjust:exact;print-color-adjust:exact;
            `;
            badge.innerHTML = `${medals[rank - 1]} Class Rank #${rank} — Top Performer`;
            rankContainer.appendChild(badge);
        }

        // ── UPDATE SUMMARY CARDS ──────────────────────────────────────────
        document.getElementById('marksheet-student-name').textContent          = studentProfileData?.name || email;
        document.getElementById('marksheet-student-email-display').textContent = email;
        document.getElementById('online-exams-taken').textContent              = `${otTaken + ntTaken}/12`;
        document.getElementById('final-percentage-score').textContent          = otFinal + '%';
        document.getElementById('nt-percentage-score').textContent             = ntHasData ? ntFinal + '%' : 'Pending';
        document.getElementById('combined-percentage-score').textContent       = combined !== null ? combined + '%' : 'Pending';
        document.getElementById('final-grade-display').textContent             = combined !== null ? calculateGrade(combined) : '—';
    }

    // ═════════════════════════════════════════════════════════════════════
    // 10. TABLE ROW BUILDERS
    // ═════════════════════════════════════════════════════════════════════

    function makeSectionHeader(text, bgColor, textColor) {
        const tr = document.createElement('tr');
        tr.style.cssText = `-webkit-print-color-adjust:exact;print-color-adjust:exact;`;
        tr.innerHTML = `
            <td colspan="5" style="
                padding:5px 8px;background:${bgColor};color:${textColor};
                font-size:8.5pt;font-weight:900;letter-spacing:0.6px;
                font-family:'Georgia',serif;border:1.5px solid ${bgColor};
                -webkit-print-color-adjust:exact;print-color-adjust:exact;">
                ${text}
            </td>`;
        return tr;
    }

    function makeExamRow(label, mark, index, td, tdc, PCA, absentText) {
        const bg = index % 2 === 0 ? '#fffdf5' : '#f5f0e8';
        const tr = document.createElement('tr');
        tr.style.cssText = `background:${bg};${PCA}`;
        tr.innerHTML = `
            <td style="${td()}background:${bg};font-weight:600;font-family:'Georgia',serif;${PCA}">${label}</td>
            <td style="${tdc()}background:${bg};font-family:Arial,sans-serif;${PCA}">
                ${mark !== null ? mark : absentText}
            </td>
            <td style="${tdc()}background:${bg};${PCA}">100</td>
            <td style="${tdc()}background:${bg};${PCA}">
                ${mark !== null ? mark + '%' : '—'}
            </td>
            <td style="${tdc()}background:${bg};${PCA}">
                ${makeStatusBadge(mark)}
            </td>`;
        return tr;
    }

    // 4-row compact summary — saves ~20px vs original 5-row version
    function appendCompactSummary(tbody, total, possible, avg, offline,
                                   w20, w80, finalPer, isPending,
                                   bg1, bg2, bgFinal, label, td, tdc, PCA) {

        // Row 1 — total online
        const r1 = document.createElement('tr');
        r1.style.cssText = `background:${bg1};${PCA}`;
        r1.innerHTML = `
            <td style="${td()}background:${bg1};font-weight:700;${PCA}">Total Online (${possible})</td>
            <td style="${tdc()}background:${bg1};font-weight:700;${PCA}">${total}</td>
            <td style="${tdc()}background:${bg1};${PCA}">${possible}</td>
            <td style="${tdc()}background:${bg1};${PCA}">${avg.toFixed(2)}%</td>
            <td style="${tdc()}background:${bg1};${PCA}">${makeStatusBadge(avg)}</td>`;
        tbody.appendChild(r1);

        // Row 2 — offline exam
        const r2 = document.createElement('tr');
        r2.style.cssText = `background:${bg1};${PCA}`;
        r2.innerHTML = `
            <td style="${td()}background:${bg1};font-weight:700;${PCA}">Offline Exam (%)</td>
            <td style="${tdc()}background:${bg1};font-weight:700;${PCA}">${isPending ? 'Pending' : offline}</td>
            <td style="${tdc()}background:${bg1};${PCA}">100</td>
            <td style="${tdc()}background:${bg1};${PCA}">${isPending ? '—' : offline + '%'}</td>
            <td style="${tdc()}background:${bg1};${PCA}">
                ${isPending ? makePendingBadge() : makeStatusBadge(offline)}
            </td>`;
        tbody.appendChild(r2);

        // Row 3 — combined weightage (20% + 80% merged into one row)
        const r3 = document.createElement('tr');
        r3.style.cssText = `background:${bg2};${PCA}`;
        r3.innerHTML = `
            <td style="${td()}background:${bg2};font-weight:700;${PCA}">
                Weightage
                <span style="font-size:7.5pt;font-weight:400;">(20% Online + 80% Offline)</span>
            </td>
            <td style="${tdc()}background:${bg2};${PCA}">
                ${isPending ? 'Pending' : w20.toFixed(2) + ' + ' + w80.toFixed(2)}
            </td>
            <td style="${tdc()}background:${bg2};${PCA}">100</td>
            <td style="${tdc()}background:${bg2};${PCA}">—</td>
            <td style="${tdc()}background:${bg2};${PCA}">
                ${isPending ? makePendingBadge() : makeStatusBadge(avg)}
            </td>`;
        tbody.appendChild(r3);

        // Row 4 — final result (highlighted)
        const r4 = document.createElement('tr');
        r4.style.cssText = `background:${bgFinal};${PCA}`;
        r4.innerHTML = `
            <td style="${td()}background:${bgFinal};font-weight:900;color:#5d4037;
                        font-size:9pt;font-family:'Georgia',serif;${PCA}">${label}</td>
            <td style="${tdc()}background:${bgFinal};font-weight:900;color:#5d4037;font-size:9pt;${PCA}">
                ${isPending ? 'Pending' : finalPer.toFixed(2)}
            </td>
            <td style="${tdc()}background:${bgFinal};font-weight:900;color:#5d4037;${PCA}">100</td>
            <td style="${tdc()}background:${bgFinal};font-weight:900;color:#5d4037;${PCA}">
                ${isPending ? '—' : finalPer + '%'}
            </td>
            <td style="${tdc()}background:${bgFinal};font-weight:900;color:#5d4037;font-size:10pt;${PCA}">
                ${isPending ? makePendingBadge() : calculateGrade(finalPer)}
            </td>`;
        tbody.appendChild(r4);
    }

    // ═════════════════════════════════════════════════════════════════════
    // 11. BADGE & GRADE HELPERS
    // ═════════════════════════════════════════════════════════════════════

    function makeStatusBadge(val) {
        if (val === null || val === undefined ||
            (typeof val === 'number' && isNaN(val))) return makeNaBadge();
        const n = parseFloat(val);
        const PCA = '-webkit-print-color-adjust:exact;print-color-adjust:exact;';
        const base = `display:inline-block;padding:1px 7px;border-radius:3px;
                      font-size:7.5pt;font-weight:700;font-family:Arial,sans-serif;${PCA}`;
        if (n >= 90) return `<span style="${base}background:#c8e6c9;color:#1b5e20;">Excellent</span>`;
        if (n >= 80) return `<span style="${base}background:#bbdefb;color:#0d47a1;">Good</span>`;
        if (n >= 70) return `<span style="${base}background:#fff3e0;color:#e65100;">Average</span>`;
        if (n >= 50) return `<span style="${base}background:#fbe9e7;color:#bf360c;">Below Average</span>`;
        return             `<span style="${base}background:#ffcdd2;color:#b71c1c;">Needs Improvement</span>`;
    }

    function makeNaBadge() {
        return `<span style="display:inline-block;padding:1px 7px;border-radius:3px;
                    font-size:7.5pt;font-weight:700;background:#f5f5f5;color:#757575;
                    font-family:Arial,sans-serif;
                    -webkit-print-color-adjust:exact;print-color-adjust:exact;">N/A</span>`;
    }

    function makePendingBadge() {
        return `<span style="display:inline-block;padding:1px 7px;border-radius:3px;
                    font-size:7.5pt;font-weight:700;background:#f3e5f5;color:#6a1b9a;
                    font-family:Arial,sans-serif;
                    -webkit-print-color-adjust:exact;print-color-adjust:exact;">Pending</span>`;
    }

    function calculateGrade(percentage) {
        if (percentage === null || isNaN(percentage)) return 'N/A';
        if (percentage >= 90) return 'A+';
        if (percentage >= 80) return 'A';
        if (percentage >= 70) return 'B+';
        if (percentage >= 60) return 'B';
        if (percentage >= 50) return 'C';
        return 'D';
    }

    function getStatus(mark) {
        if (mark === null || mark === undefined || isNaN(mark)) return 'N/A';
        const n = parseFloat(mark);
        if (n >= 90) return 'Excellent';
        if (n >= 80) return 'Good';
        if (n >= 70) return 'Average';
        if (n >= 50) return 'Below Average';
        return 'Needs Improvement';
    }

})();
